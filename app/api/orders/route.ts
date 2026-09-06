import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { PricingError, priceOrder } from "@/lib/pricing";
import { createRazorpayOrder, getPublicKeyId } from "@/lib/razorpay";

/**
 * Creates a pending order and its Razorpay counterpart.
 *
 * The row is written before the customer is sent to pay, so a payment can
 * never arrive for an order we have no record of. The amount comes from
 * lib/pricing, never from the request body.
 */

export const runtime = "nodejs";

// Indian mobile numbers: ten digits starting 6-9, with common prefixes allowed.
const phone = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, "").replace(/^(\+91|0091|91|0)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."));

const requestSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1)
    .max(10),
  customer: z.object({
    name: z.string().trim().min(2, "Enter your full name.").max(120),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    phone,
  }),
  address: z.object({
    line1: z.string().trim().min(4, "Enter your street address.").max(200),
    line2: z.string().trim().max(200).optional().or(z.literal("")),
    city: z.string().trim().min(2).max(80),
    state: z.string().trim().min(2).max(80),
    pincode: z.string().trim().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code."),
  }),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: bots fill hidden fields, humans cannot see them.
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { items, customer, address, notes } = parsed.data;

  let priced;
  try {
    priced = priceOrder(items);
  } catch (error) {
    if (error instanceof PricingError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }

  const receipt = `vl_${Date.now().toString(36)}`;

  let razorpayOrder;
  try {
    razorpayOrder = await createRazorpayOrder({
      amountPaise: priced.totalPaise,
      currency: priced.currency,
      receipt,
      notes: { customerEmail: customer.email, customerPhone: customer.phone },
    });
  } catch (error) {
    console.error("[orders] Razorpay order creation failed", error);
    return NextResponse.json(
      { error: "We could not start the payment. Please try again in a moment." },
      { status: 502 },
    );
  }

  try {
    const order = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(orders)
        .values({
          razorpayOrderId: razorpayOrder.id,
          currency: priced.currency,
          subtotalPaise: priced.subtotalPaise,
          shippingPaise: priced.shippingPaise,
          totalPaise: priced.totalPaise,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          addressLine1: address.line1,
          addressLine2: address.line2 || null,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          notes: notes || null,
        })
        .returning();

      await tx.insert(orderItems).values(
        priced.items.map((item) => ({ ...item, orderId: created.id })),
      );

      return created;
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amountPaise: priced.totalPaise,
      currency: priced.currency,
      keyId: getPublicKeyId(),
    });
  } catch (error) {
    console.error("[orders] Failed to persist order", error);
    return NextResponse.json(
      { error: "We could not save your order. Please try again." },
      { status: 500 },
    );
  }
}
