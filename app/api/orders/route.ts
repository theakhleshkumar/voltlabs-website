import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { sendOrderNotification } from "@/lib/email";
import { PricingError, priceOrder } from "@/lib/pricing";
import { createRazorpayOrder, getPublicKeyId } from "@/lib/razorpay";

/**
 * Places an order.
 *
 * Cash on delivery is the live path today: the order is saved, the shop is
 * emailed, and the customer goes straight to a confirmation page. The online
 * path creates a Razorpay order and leaves the row pending until the payment
 * is verified; it is kept working but is not offered in the UI yet.
 *
 * Amounts always come from lib/pricing, never from the request body.
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
  paymentMethod: z.enum(["cod", "online"]).default("cod"),
  customer: z.object({
    name: z.string().trim().min(2, "Enter your full name.").max(120),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    phone,
  }),
  address: z.object({
    line1: z.string().trim().min(4, "Enter your street address.").max(200),
    line2: z.string().trim().max(200).optional().or(z.literal("")),
    city: z.string().trim().min(2, "Enter your city.").max(80),
    state: z.string().trim().min(2, "Select your state.").max(80),
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
    // Keyed by the leaf field name ("phone", "pincode") so the form can put
    // each message under the input it belongs to. flattenError is no use here:
    // it only descends one level, so everything would arrive lumped under
    // "customer" and "address".
    const fields: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path.at(-1) ?? "form");
      (fields[key] ??= []).push(issue.message);
    }

    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields },
      { status: 400 },
    );
  }

  const { items, customer, address, notes, paymentMethod } = parsed.data;

  let priced;
  try {
    priced = priceOrder(items);
  } catch (error) {
    if (error instanceof PricingError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    throw error;
  }

  // Online orders need a Razorpay order before anything is written, so a row
  // is never left pointing at a payment that was never created.
  let razorpayOrderId: string | null = null;
  if (paymentMethod === "online") {
    try {
      const razorpayOrder = await createRazorpayOrder({
        amountPaise: priced.totalPaise,
        currency: priced.currency,
        receipt: `vl_${Date.now().toString(36)}`,
        notes: { customerEmail: customer.email, customerPhone: customer.phone },
      });
      razorpayOrderId = razorpayOrder.id;
    } catch (error) {
      console.error("[orders] Razorpay order creation failed", error);
      return NextResponse.json(
        { error: "We could not start the payment. Please try again in a moment." },
        { status: 502 },
      );
    }
  }

  let order;
  try {
    order = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(orders)
        .values({
          paymentMethod,
          razorpayOrderId,
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
  } catch (error) {
    console.error("[orders] Failed to persist order", error);
    return NextResponse.json(
      { error: "We could not save your order. Please try again." },
      { status: 500 },
    );
  }

  if (paymentMethod === "online") {
    return NextResponse.json({
      paymentMethod,
      orderId: order.id,
      razorpayOrderId,
      amountPaise: priced.totalPaise,
      currency: priced.currency,
      keyId: getPublicKeyId(),
    });
  }

  // COD is complete at this point. The order is saved, so a failed email is
  // logged and surfaced but never turns a real order into an error page.
  const email = await sendOrderNotification({
    orderNo: order.orderNo,
    orderId: order.id,
    placedAt: order.createdAt,
    paymentMethod: "cod",
    customer,
    address,
    items: priced.items,
    subtotalPaise: priced.subtotalPaise,
    shippingPaise: priced.shippingPaise,
    totalPaise: priced.totalPaise,
    notes: notes || null,
  });

  if (!email.sent) {
    console.error(
      `[orders] Order ${order.orderNo} saved but notification failed via ${email.provider}: ${email.error}`,
    );
  }

  return NextResponse.json({
    paymentMethod,
    orderId: order.id,
    orderNo: order.orderNo,
  });
}
