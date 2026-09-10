import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import ThemeToggle from "@/components/ThemeToggle";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/db/schema";
import { formatOrderNo } from "@/lib/email";
import { formatInr } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

// The order id is a random UUID, so the URL is unguessable and can act as the
// receipt link without needing an account.
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} />
              <span className="text-xl font-bold text-gray-900">VoltLabs</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Order confirmed</h1>
            <p className="text-gray-600 mt-3">
              Thank you, {order.customerName.split(" ")[0]}. We have your order and will call
              you on {order.customerPhone} to confirm before dispatch.
            </p>
            {order.paymentMethod === "upi" && (
              <p className="text-gray-600 mt-2 text-sm">
                We will verify your UPI payment
                {order.upiReference ? ` (reference ${order.upiReference})` : ""} and confirm.
                Nothing more to pay on delivery.
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Order number</p>
                <p className="text-xl font-bold text-gray-900">{formatOrderNo(order.orderNo)}</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-[#EAA832]/10 text-[#D4922A] text-sm font-semibold">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "upi"
                    ? "Paid by UPI"
                    : "Paid online"}
              </span>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 mb-3">Items</h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-700">
                      {item.quantity} &times; {item.productName}
                    </span>
                    <span className="text-gray-900 font-medium whitespace-nowrap">
                      {formatInr(item.lineTotalPaise)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="space-y-2.5 text-sm pt-5 border-t border-gray-200">
              <div className="flex justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="text-gray-900">{formatInr(order.subtotalPaise)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="text-green-600 font-medium">
                  {order.shippingPaise === 0 ? "Free" : formatInr(order.shippingPaise)}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 text-base">
                <dt className="font-bold text-gray-900">
                  {order.paymentMethod === "cod" ? "Pay on delivery" : "Total paid"}
                </dt>
                <dd className="font-bold text-gray-900">{formatInr(order.totalPaise)}</dd>
              </div>
            </dl>

            <div className="pt-5 border-t border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-2">Delivering to</h2>
              <address className="text-sm text-gray-600 not-italic leading-relaxed">
                {order.customerName}<br />
                {order.addressLine1}<br />
                {order.addressLine2 && <>{order.addressLine2}<br /></>}
                {order.city}, {order.state} {order.pincode}
              </address>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-600">
              Questions about this order? Message us on WhatsApp with your order number.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/918178902630?text=${encodeURIComponent(
                  `Hi VoltLabs! I have a question about my order ${formatOrderNo(order.orderNo)}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Message on WhatsApp
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#EAA832] text-gray-700 hover:text-[#EAA832] px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
