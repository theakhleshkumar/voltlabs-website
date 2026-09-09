"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatInr } from "@/lib/pricing";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "failed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "refunded";

export interface AdminOrder {
  id: string;
  orderNo: number;
  status: OrderStatus;
  paymentMethod: "cod" | "online";
  totalPaise: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  notes: string | null;
  createdAt: string;
  items: { productName: string; quantity: number }[];
}

// Status carries meaning, so it reads at a glance rather than needing the label
// to be read word by word.
const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  refunded: "bg-gray-100 text-gray-700 border-gray-200",
};

const NEXT_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "paid",
  "cancelled",
  "refunded",
];

const formatOrderNo = (n: number) => `VL-${String(n).padStart(5, "0")}`;

const OrderRow = ({ order }: { order: AdminOrder }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeStatus = async (status: OrderStatus) => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setError(result.error ?? "Could not update.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSaving(false);
    }
  };

  const address = [
    order.addressLine1,
    order.addressLine2,
    `${order.city}, ${order.state} ${order.pincode}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap">
          <button
            onClick={() => setOpen((v) => !v)}
            className="font-semibold text-gray-900 hover:text-[#EAA832] cursor-pointer"
            aria-expanded={open}
          >
            {formatOrderNo(order.orderNo)}
          </button>
          <div className="text-xs text-gray-500 mt-0.5">
            {new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </div>
        </td>

        <td className="px-4 py-3">
          <div className="font-medium text-gray-900">{order.customerName}</div>
          <a href={`tel:${order.customerPhone}`} className="text-sm text-gray-600 hover:text-[#EAA832]">
            {order.customerPhone}
          </a>
        </td>

        <td className="px-4 py-3 text-sm text-gray-600">
          {order.items.map((item) => `${item.quantity} × ${item.productName}`).join(", ")}
        </td>

        <td className="px-4 py-3 whitespace-nowrap">
          <div className="font-semibold text-gray-900 tabular-nums">
            {formatInr(order.totalPaise)}
          </div>
          <div className="text-xs text-gray-500 uppercase">{order.paymentMethod}</div>
        </td>

        <td className="px-4 py-3">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLE[order.status]}`}
          >
            {order.status}
          </span>
        </td>

        <td className="px-4 py-3">
          <select
            value={order.status}
            disabled={saving}
            onChange={(event) => changeStatus(event.target.value as OrderStatus)}
            aria-label={`Change status of order ${formatOrderNo(order.orderNo)}`}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:border-[#EAA832] outline-none cursor-pointer disabled:opacity-50"
          >
            {NEXT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </td>
      </tr>

      {open && (
        <tr className="border-b border-gray-200 bg-gray-50">
          <td colSpan={6} className="px-4 py-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Deliver to</div>
                <p className="text-gray-700">{address}</p>
                <a
                  href={`https://wa.me/91${order.customerPhone}?text=${encodeURIComponent(
                    `Hi ${order.customerName.split(" ")[0]}, this is VoltLabs about your order ${formatOrderNo(order.orderNo)}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[#25D366] font-medium hover:underline"
                >
                  Message on WhatsApp
                </a>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Contact</div>
                <p className="text-gray-700">{order.customerEmail}</p>
                {order.notes && (
                  <>
                    <div className="font-semibold text-gray-900 mt-3 mb-1">Customer note</div>
                    <p className="text-gray-700">{order.notes}</p>
                  </>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
