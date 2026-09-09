import { formatInr } from "./pricing";

/**
 * Order notifications.
 *
 * Two rules shape this module:
 *
 * 1. Sending must never throw. An order that is already saved and paid for
 *    must not be reported as failed because a mail API had a bad minute. Every
 *    path returns a result object and logs; callers carry on regardless.
 * 2. The provider sits behind one function, so swapping to SES during the AWS
 *    move touches this file and nothing else.
 */

export const ORDER_NOTIFICATION_EMAIL =
  process.env.ORDER_NOTIFICATION_EMAIL || "admin@voltlabs.in";

export interface OrderEmailPayload {
  orderNo: number;
  orderId: string;
  placedAt: Date;
  paymentMethod: "cod" | "online";
  customer: { name: string; email: string; phone: string };
  address: {
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  items: { productName: string; quantity: number; unitPricePaise: number; lineTotalPaise: number }[];
  subtotalPaise: number;
  shippingPaise: number;
  totalPaise: number;
  notes?: string | null;
}

export const formatOrderNo = (orderNo: number): string =>
  `VL-${String(orderNo).padStart(5, "0")}`;

const buildSubject = (payload: OrderEmailPayload): string =>
  `New ${payload.paymentMethod === "cod" ? "COD" : "prepaid"} order ${formatOrderNo(
    payload.orderNo,
  )} — ${formatInr(payload.totalPaise)}`;

const buildText = (p: OrderEmailPayload): string => {
  const lines: string[] = [];
  lines.push(`Order ${formatOrderNo(p.orderNo)}`);
  lines.push(
    `Placed ${p.placedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  );
  lines.push(
    `Payment: ${p.paymentMethod === "cod" ? "CASH ON DELIVERY — collect on delivery" : "Paid online"}`,
  );
  lines.push("");
  lines.push("CUSTOMER");
  lines.push(`  ${p.customer.name}`);
  lines.push(`  ${p.customer.phone}`);
  lines.push(`  ${p.customer.email}`);
  lines.push("");
  lines.push("DELIVER TO");
  lines.push(`  ${p.address.line1}`);
  if (p.address.line2) lines.push(`  ${p.address.line2}`);
  lines.push(`  ${p.address.city}, ${p.address.state} ${p.address.pincode}`);
  lines.push("");
  lines.push("ITEMS");
  for (const item of p.items) {
    lines.push(
      `  ${item.quantity} x ${item.productName} @ ${formatInr(item.unitPricePaise)} = ${formatInr(item.lineTotalPaise)}`,
    );
  }
  lines.push("");
  lines.push(`  Subtotal  ${formatInr(p.subtotalPaise)}`);
  lines.push(`  Shipping  ${p.shippingPaise === 0 ? "Free" : formatInr(p.shippingPaise)}`);
  lines.push(`  TOTAL     ${formatInr(p.totalPaise)}`);
  if (p.notes) {
    lines.push("");
    lines.push(`NOTE FROM CUSTOMER: ${p.notes}`);
  }
  lines.push("");
  lines.push(`Order id: ${p.orderId}`);
  return lines.join("\n");
};

const esc = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const buildHtml = (p: OrderEmailPayload): string => `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;color:#14181f">
  <h2 style="margin:0 0 4px">Order ${formatOrderNo(p.orderNo)}</h2>
  <p style="margin:0 0 16px;color:#5a6472;font-size:14px">
    ${esc(p.placedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))} IST
  </p>
  <p style="margin:0 0 20px;padding:10px 14px;border-radius:6px;background:${
    p.paymentMethod === "cod" ? "#fdf4e3" : "#eaf4ef"
  };font-weight:600">
    ${p.paymentMethod === "cod" ? `Cash on delivery — collect ${esc(formatInr(p.totalPaise))}` : "Paid online"}
  </p>

  <h3 style="margin:0 0 6px;font-size:15px">Customer</h3>
  <p style="margin:0 0 18px;line-height:1.6">
    ${esc(p.customer.name)}<br>
    <a href="tel:${esc(p.customer.phone)}">${esc(p.customer.phone)}</a><br>
    <a href="mailto:${esc(p.customer.email)}">${esc(p.customer.email)}</a>
  </p>

  <h3 style="margin:0 0 6px;font-size:15px">Deliver to</h3>
  <p style="margin:0 0 18px;line-height:1.6">
    ${esc(p.address.line1)}<br>
    ${p.address.line2 ? `${esc(p.address.line2)}<br>` : ""}
    ${esc(p.address.city)}, ${esc(p.address.state)} ${esc(p.address.pincode)}
  </p>

  <h3 style="margin:0 0 6px;font-size:15px">Items</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${p.items
      .map(
        (item) => `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc">
        ${item.quantity} &times; ${esc(item.productName)}
      </td>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc;text-align:right">
        ${esc(formatInr(item.lineTotalPaise))}
      </td>
    </tr>`,
      )
      .join("")}
    <tr>
      <td style="padding:6px 0">Shipping</td>
      <td style="padding:6px 0;text-align:right">${
        p.shippingPaise === 0 ? "Free" : esc(formatInr(p.shippingPaise))
      }</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-weight:700;border-top:2px solid #14181f">Total</td>
      <td style="padding:8px 0;font-weight:700;text-align:right;border-top:2px solid #14181f">
        ${esc(formatInr(p.totalPaise))}
      </td>
    </tr>
  </table>

  ${
    p.notes
      ? `<h3 style="margin:18px 0 6px;font-size:15px">Note from customer</h3>
         <p style="margin:0;line-height:1.6">${esc(p.notes)}</p>`
      : ""
  }

  <p style="margin:24px 0 0;color:#8d97a6;font-size:12px">Order id ${esc(p.orderId)}</p>
</div>`;

type SendResult = { sent: boolean; provider: string; error?: string };

const sendViaResend = async (
  subject: string,
  text: string,
  html: string,
): Promise<SendResult> => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ORDER_EMAIL_FROM || "VoltLabs Orders <orders@voltlabs.in>",
      to: [ORDER_NOTIFICATION_EMAIL],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return { sent: false, provider: "resend", error: await response.text() };
  }
  return { sent: true, provider: "resend" };
};

const sendViaWeb3Forms = async (subject: string, text: string): Promise<SendResult> => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ORDERS_KEY,
      subject,
      from_name: "VoltLabs Orders",
      message: text,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || !result.success) {
    return { sent: false, provider: "web3forms", error: JSON.stringify(result) };
  }
  return { sent: true, provider: "web3forms" };
};

/**
 * Emails the order to the shop. Returns whether it worked rather than
 * throwing, so a mail outage can never lose a real order.
 */
export const sendOrderNotification = async (
  payload: OrderEmailPayload,
): Promise<SendResult> => {
  const subject = buildSubject(payload);
  const text = buildText(payload);

  try {
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(subject, text, buildHtml(payload));
    }
    if (process.env.WEB3FORMS_ORDERS_KEY) {
      return await sendViaWeb3Forms(subject, text);
    }

    // Nothing configured. Log the order in full so it is recoverable from
    // server logs, and say so loudly.
    console.warn(
      `[email] No mail provider configured; order ${formatOrderNo(payload.orderNo)} not emailed.\n${text}`,
    );
    return { sent: false, provider: "none", error: "No provider configured" };
  } catch (error) {
    console.error("[email] Order notification failed", error);
    return {
      sent: false,
      provider: "unknown",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
