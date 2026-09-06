import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { verifyCheckoutSignature } from "@/lib/razorpay";

/**
 * Confirms the payment the browser just completed, so the customer can be sent
 * to a confirmation page immediately.
 *
 * This is a convenience, not the authority. If the customer closes the tab
 * before this runs, the webhook still marks the order paid. Both paths are
 * written to be safe if the other has already run.
 */

export const runtime = "nodejs";

const requestSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
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
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: signature,
  } = parsed.data;

  if (!verifyCheckoutSignature({ razorpayOrderId, razorpayPaymentId, signature })) {
    console.warn("[verify] Signature mismatch for order", razorpayOrderId);
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const [existing] = await db
    .select()
    .from(orders)
    .where(eq(orders.razorpayOrderId, razorpayOrderId))
    .limit(1);

  if (!existing) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  // Only promote a pending order. If the webhook already marked it paid, or an
  // admin refunded it, leave that alone and just report success.
  if (existing.status === "pending") {
    await db
      .update(orders)
      .set({
        status: "paid",
        razorpayPaymentId,
        razorpaySignature: signature,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(orders.id, existing.id), eq(orders.status, "pending")));
  }

  return NextResponse.json({ orderId: existing.id, orderNo: existing.orderNo });
}
