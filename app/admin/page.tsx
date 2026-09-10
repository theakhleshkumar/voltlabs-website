import Link from "next/link";
import type { Metadata } from "next";
import { desc, inArray } from "drizzle-orm";
import AdminLogin from "@/components/admin/AdminLogin";
import OrderRow, { type AdminOrder } from "@/components/admin/OrderRow";
import SignOutButton from "@/components/admin/SignOutButton";
import { isAdminAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { formatInr } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

// Always current: an order list that could be served from cache is worse than
// useless when you are deciding what to dispatch today.
export const dynamic = "force-dynamic";

const RECENT_LIMIT = 100;

export default async function AdminPage() {
  if (!env.admin.isConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md bg-white border border-gray-200 rounded-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Admin panel not configured</h1>
          <p className="text-sm text-gray-600">
            Set <code className="bg-gray-100 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code> and{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">ADMIN_SESSION_SECRET</code> in the
            environment, then reload. See <code className="bg-gray-100 px-1.5 py-0.5 rounded">.env.example</code>.
          </p>
        </div>
      </main>
    );
  }

  if (!(await isAdminAuthenticated())) return <AdminLogin />;

  let rows: (typeof orders.$inferSelect)[];
  let items: (typeof orderItems.$inferSelect)[];
  try {
    rows = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(RECENT_LIMIT);

    // One query for every line item rather than one per order.
    items = rows.length
      ? await db
          .select()
          .from(orderItems)
          .where(inArray(orderItems.orderId, rows.map((row) => row.id)))
      : [];
  } catch (error) {
    // A database outage should explain itself here rather than showing the
    // generic error page, since this is the screen used to run the shop.
    logger.error("admin.orders_query_failed", { error });
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md bg-white border border-red-200 rounded-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Cannot reach the database</h1>
          <p className="text-sm text-gray-600">
            Orders could not be loaded. Check{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">DATABASE_URL</code>, then reload.{" "}
            <a href="/api/health" className="text-[#EAA832] hover:underline">
              View health check
            </a>
            .
          </p>
        </div>
      </main>
    );
  }

  const itemsByOrder = new Map<string, { productName: string; quantity: number }[]>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push({ productName: item.productName, quantity: item.quantity });
    itemsByOrder.set(item.orderId, list);
  }

  const adminOrders: AdminOrder[] = rows.map((row) => ({
    id: row.id,
    orderNo: row.orderNo,
    status: row.status,
    paymentMethod: row.paymentMethod,
    totalPaise: row.totalPaise,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    customerEmail: row.customerEmail,
    addressLine1: row.addressLine1,
    addressLine2: row.addressLine2,
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    items: itemsByOrder.get(row.id) ?? [],
  }));

  const needsAction = adminOrders.filter((order) => order.status === "pending").length;
  const revenuePaise = adminOrders
    .filter((order) => order.status === "paid" || order.status === "delivered")
    .reduce((sum, order) => sum + order.totalPaise, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">
              Showing the {Math.min(adminOrders.length, RECENT_LIMIT)} most recent.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm text-gray-600 hover:text-[#EAA832] font-medium">
              ← Back to site
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Awaiting confirmation", value: String(needsAction) },
            { label: "Orders shown", value: String(adminOrders.length) },
            { label: "Collected", value: formatInr(revenuePaise) },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">{stat.value}</div>
            </div>
          ))}
        </div>

        {adminOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-gray-600">No orders yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  {["Order", "Customer", "Items", "Total", "Status", "Update"].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
