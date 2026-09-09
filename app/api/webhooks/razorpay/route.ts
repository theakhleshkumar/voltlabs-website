import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, webhookEvents } from "@/lib/db/schema";
import { logger } from "@/lib/logger";
import { verifyWebhookSignature } from "@/lib/razorpay";

/**
 * The authoritative record of what was paid.
 *
 * The browser callback in /api/orders/verify is best-effort: people close the
 * tab, lose signal, or kill the app mid-payment. Razorpay calls this endpoint
 * regardless, and retries until it gets a 2xx -- so this is what must never be
 * wrong.
 *
 * Configure at Razorpay -> Settings -> Webhooks:
 *   URL    https://voltlabs.in/api/webhooks/razorpay
 *   Events payment.captured, payment.failed
 *   Secret the value of RAZORPAY_WEBHOOK_SECRET
 */

export const runtime = "nodejs";
// Signature is computed over the exact bytes received, so the body must not be
// cached, transformed, or re-serialised anywhere in the path.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  const eventId = request.headers.get("x-razorpay-event-id");

  if (!signature || !eventId) {
    return NextResponse.json({ error: "Missing signature headers." }, { status: 400 });
  }

  // Read as raw text before any parsing -- re-serialising JSON would change the
  // bytes and the signature would never match.
  const rawBody = await request.text();

  if (!verifyWebhookSignature({ rawBody, signature })) {
    logger.warn("webhook.bad_signature", { eventId });
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let payload: {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const event = payload.event ?? "unknown";

  // Claim the event id. If this insert does nothing, another delivery of the
  // same event already ran and there is nothing left to do.
  const claimed = await db
    .insert(webhookEvents)
    .values({ id: eventId, event, payload })
    .onConflictDoNothing({ target: webhookEvents.id })
    .returning({ id: webhookEvents.id });

  if (claimed.length === 0) {
    return NextResponse.json({ ok: true, deduplicated: true });
  }

  const payment = payload.payload?.payment?.entity;
  const razorpayOrderId = payment?.order_id;

  if (!razorpayOrderId) {
    // Nothing actionable, but acknowledge so Razorpay stops retrying.
    return NextResponse.json({ ok: true, ignored: event });
  }

  try {
    if (event === "payment.captured") {
      await db
        .update(orders)
        .set({
          status: "paid",
          razorpayPaymentId: payment?.id ?? null,
          paidAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(orders.razorpayOrderId, razorpayOrderId),
            eq(orders.status, "pending"),
          ),
        );
    } else if (event === "payment.failed") {
      await db
        .update(orders)
        .set({ status: "failed", updatedAt: new Date() })
        .where(
          and(
            eq(orders.razorpayOrderId, razorpayOrderId),
            eq(orders.status, "pending"),
          ),
        );
    }
  } catch (error) {
    // Return non-2xx so Razorpay retries. The event row is removed first, or
    // the retry would be deduplicated and the order left stuck as pending.
    logger.error("webhook.apply_failed", { eventId, event, error });
    await db.delete(webhookEvents).where(eq(webhookEvents.id, eventId));
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
