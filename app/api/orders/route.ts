import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { sendCustomerConfirmation, sendOrderNotification } from "@/lib/email";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { PricingError, priceOrder } from "@/lib/pricing";
import { checkOrderRateLimit, clientIpFrom, hashIp } from "@/lib/rate-limit";
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
  paymentMethod: z.enum(["cod", "upi", "online"]).default("cod"),
  /**
   * UPI transaction reference, entered after paying by QR. Required for UPI
   * because it is the only link between an unattributed bank credit and this
   * order. Banks and apps format it differently, so this only checks it looks
   * like a reference rather than pinning a single shape.
   */
  upiReference: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9-]{6,35}$/, "Enter the UPI reference or transaction ID from your payment app.")
    .optional()
    .or(z.literal("")),
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

  const { items, customer, address, notes, paymentMethod, upiReference } = parsed.data;

  // Without a reference a UPI payment cannot be matched to its order, so the
  // order is refused rather than accepted and left unreconcilable.
  if (paymentMethod === "upi" && !upiReference) {
    return NextResponse.json(
      {
        error: "Please enter the UPI reference shown in your payment app after paying.",
        fields: {
          upiReference: ["Enter the UPI reference or transaction ID from your payment app."],
        },
      },
      { status: 400 },
    );
  }

  // Online payment is only offered when Razorpay is actually configured, so a
  // half-configured deployment cannot strand a customer at a broken payment step.
  if (paymentMethod === "online" && !env.razorpay.isConfigured()) {
    logger.warn("orders.online_unavailable", {});
    return NextResponse.json(
      { error: "Online payment is unavailable right now. Please choose cash on delivery." },
      { status: 503 },
    );
  }

  const ipHash = hashIp(clientIpFrom(request));

  try {
    const limit = await checkOrderRateLimit({ phone: customer.phone, ipHash });
    if (!limit.allowed) {
      logger.warn("orders.rate_limited", { ipHash, phone: customer.phone });
      return NextResponse.json({ error: limit.reason }, { status: 429 });
    }
  } catch (error) {
    // A rate-limit lookup failure must not stop a genuine customer ordering.
    logger.error("orders.rate_limit_check_failed", { error });
  }

  let priced;
  try {
    priced = priceOrder(items);
  } catch (error) {
    if (error instanceof PricingError) {
      logger.info("orders.rejected", { reason: error.message });
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
      logger.error("orders.razorpay_create_failed", { error });
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
          upiReference: paymentMethod === "upi" ? upiReference || null : null,
          ipHash,
        })
        .returning();

      await tx.insert(orderItems).values(
        priced.items.map((item) => ({ ...item, orderId: created.id })),
      );

      return created;
    });
  } catch (error) {
    logger.error("orders.persist_failed", { error });
    return NextResponse.json(
      { error: "We could not save your order. Please try again." },
      { status: 500 },
    );
  }

  logger.info("orders.placed", {
    orderNo: order.orderNo,
    orderId: order.id,
    paymentMethod,
    totalPaise: priced.totalPaise,
    itemCount: priced.items.length,
    pincode: address.pincode,
  });

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

  // COD and UPI are both complete at this point -- the money is either owed on
  // delivery or already transferred. Both emails are best-effort: the order is
  // already saved, so a mail outage must never turn a real order into an error
  // page. They are sent together rather than in sequence so a slow provider
  // does not double the customer's wait.
  const payload = {
    orderNo: order.orderNo,
    orderId: order.id,
    placedAt: order.createdAt,
    paymentMethod: paymentMethod as "cod" | "upi",
    upiReference: upiReference || null,
    customer,
    address,
    items: priced.items,
    subtotalPaise: priced.subtotalPaise,
    shippingPaise: priced.shippingPaise,
    totalPaise: priced.totalPaise,
    notes: notes || null,
  };

  const [shop, buyer] = await Promise.all([
    sendOrderNotification(payload),
    sendCustomerConfirmation(payload),
  ]);

  if (!shop.sent) {
    logger.error("orders.shop_notification_failed", {
      orderNo: order.orderNo,
      reason: shop.error,
    });
  }
  if (!buyer.sent) {
    logger.warn("orders.customer_confirmation_failed", {
      orderNo: order.orderNo,
      reason: buyer.error,
    });
  }

  return NextResponse.json({
    paymentMethod,
    orderId: order.id,
    orderNo: order.orderNo,
  });
}
