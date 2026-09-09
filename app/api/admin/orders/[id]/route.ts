import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { UnauthorizedError, requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "paid",
    "failed",
    "cancelled",
    "shipped",
    "delivered",
    "refunded",
  ]),
});

/** Moves an order along the fulfilment path. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    throw error;
  }

  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Unknown status." }, { status: 400 });
  }

  let updated;
  try {
    [updated] = await db
      .update(orders)
      .set({
        status: parsed.data.status,
        updatedAt: new Date(),
        // Recording when cash was actually collected keeps COD revenue
        // reportable from the same column as online payments.
        ...(parsed.data.status === "paid" ? { paidAt: new Date() } : {}),
      })
      .where(eq(orders.id, id))
      .returning();
  } catch (error) {
    // Without this the database being unreachable surfaces as a bare 500 with
    // an empty body, and the admin sees a silent failure.
    logger.error("admin.order_update_failed", { orderId: id, error });
    return NextResponse.json(
      { error: "Could not reach the database. Please try again." },
      { status: 503 },
    );
  }

  if (!updated) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  logger.info("admin.order_status_changed", {
    orderNo: updated.orderNo,
    status: parsed.data.status,
  });

  return NextResponse.json({ ok: true, status: updated.status });
}
