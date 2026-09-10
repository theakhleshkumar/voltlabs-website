import { env } from "./env";
import { sendMail } from "./mailer";
import { formatInr } from "./pricing";

/**
 * Transactional email content.
 *
 * Delivery itself lives in lib/mailer over SMTP; this module only decides what
 * each message says. Sending never throws -- callers are usually finishing an
 * order that is already saved, and a mail outage must not turn a real order
 * into an error page.
 */

export interface OrderEmailPayload {
  orderNo: number;
  orderId: string;
  placedAt: Date;
  paymentMethod: "cod" | "upi" | "online";
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

const paymentLineForShop = (p: OrderEmailPayload): string => {
  if (p.paymentMethod === "cod") {
    return `Payment: CASH ON DELIVERY — collect ${formatInr(p.totalPaise)}`;
  }
  if (p.paymentMethod === "upi") {
    return (
      `Payment: UPI — customer says they paid ${formatInr(p.totalPaise)}\n` +
      `VERIFY BEFORE DISPATCH: look for ${formatInr(p.totalPaise)} in the account ` +
      `around ${inIst(p.placedAt)} IST.`
    );
  }
  return "Payment: paid online";
};

const esc = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const inIst = (date: Date): string =>
  date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

const addressLines = (p: OrderEmailPayload): string[] =>
  [
    p.address.line1,
    p.address.line2 || null,
    `${p.address.city}, ${p.address.state} ${p.address.pincode}`,
  ].filter((line): line is string => Boolean(line));

const itemLines = (p: OrderEmailPayload): string[] =>
  p.items.map(
    (item) =>
      `  ${item.quantity} x ${item.productName} @ ${formatInr(item.unitPricePaise)} = ${formatInr(item.lineTotalPaise)}`,
  );

// ---------------------------------------------------------------------------
// Shop notification
// ---------------------------------------------------------------------------

const shopText = (p: OrderEmailPayload): string =>
  [
    `Order ${formatOrderNo(p.orderNo)}`,
    `Placed ${inIst(p.placedAt)} IST`,
    paymentLineForShop(p),
    "",
    "CUSTOMER",
    `  ${p.customer.name}`,
    `  ${p.customer.phone}`,
    `  ${p.customer.email}`,
    "",
    "DELIVER TO",
    ...addressLines(p).map((line) => `  ${line}`),
    "",
    "ITEMS",
    ...itemLines(p),
    "",
    `  Subtotal  ${formatInr(p.subtotalPaise)}`,
    `  Shipping  ${p.shippingPaise === 0 ? "Free" : formatInr(p.shippingPaise)}`,
    `  TOTAL     ${formatInr(p.totalPaise)}`,
    ...(p.notes ? ["", `NOTE FROM CUSTOMER: ${p.notes}`] : []),
    "",
    `Order id: ${p.orderId}`,
  ].join("\n");

const shopHtml = (p: OrderEmailPayload): string => `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;color:#14181f">
  <h2 style="margin:0 0 4px">Order ${formatOrderNo(p.orderNo)}</h2>
  <p style="margin:0 0 16px;color:#5a6472;font-size:14px">${esc(inIst(p.placedAt))} IST</p>
  <p style="margin:0 0 20px;padding:10px 14px;border-radius:6px;background:${
    p.paymentMethod === "online" ? "#eaf4ef" : p.paymentMethod === "cod" ? "#fdf4e3" : "#e8eef8"
  };font-weight:600">
    ${
      p.paymentMethod === "cod"
        ? `Cash on delivery — collect ${esc(formatInr(p.totalPaise))}`
        : p.paymentMethod === "upi"
          ? `UPI — customer says they paid ${esc(formatInr(p.totalPaise))}<br>
             <span style="font-weight:400;font-size:14px">Verify before dispatch: look for ${esc(formatInr(p.totalPaise))} around ${esc(inIst(p.placedAt))} IST</span>`
          : "Paid online"
    }
  </p>
  <h3 style="margin:0 0 6px;font-size:15px">Customer</h3>
  <p style="margin:0 0 18px;line-height:1.6">
    ${esc(p.customer.name)}<br>
    <a href="tel:${esc(p.customer.phone)}">${esc(p.customer.phone)}</a><br>
    <a href="mailto:${esc(p.customer.email)}">${esc(p.customer.email)}</a>
  </p>
  <h3 style="margin:0 0 6px;font-size:15px">Deliver to</h3>
  <p style="margin:0 0 18px;line-height:1.6">${addressLines(p).map(esc).join("<br>")}</p>
  <h3 style="margin:0 0 6px;font-size:15px">Items</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${p.items
      .map(
        (item) => `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc">${item.quantity} &times; ${esc(item.productName)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc;text-align:right">${esc(formatInr(item.lineTotalPaise))}</td>
    </tr>`,
      )
      .join("")}
    <tr>
      <td style="padding:8px 0;font-weight:700;border-top:2px solid #14181f">Total</td>
      <td style="padding:8px 0;font-weight:700;text-align:right;border-top:2px solid #14181f">${esc(formatInr(p.totalPaise))}</td>
    </tr>
  </table>
  ${p.notes ? `<h3 style="margin:18px 0 6px;font-size:15px">Note from customer</h3><p style="margin:0;line-height:1.6">${esc(p.notes)}</p>` : ""}
  <p style="margin:24px 0 0;color:#8d97a6;font-size:12px">Order id ${esc(p.orderId)}</p>
</div>`;

/** Tells the shop a new order has arrived. */
export const sendOrderNotification = async (p: OrderEmailPayload) =>
  sendMail({
    to: env.email.notificationAddress(),
    subject: `New ${
      p.paymentMethod === "cod" ? "COD" : p.paymentMethod === "upi" ? "UPI" : "prepaid"
    } order ${formatOrderNo(
      p.orderNo,
    )} — ${formatInr(p.totalPaise)}`,
    text: shopText(p),
    html: shopHtml(p),
    // Replying to the notification reaches the customer directly.
    replyTo: p.customer.email,
  });

// ---------------------------------------------------------------------------
// Customer confirmation
// ---------------------------------------------------------------------------

const customerText = (p: OrderEmailPayload): string =>
  [
    `Hi ${p.customer.name.split(" ")[0]},`,
    "",
    p.paymentMethod === "upi"
      ? `Thank you for your order. We have it, and we will confirm your UPI payment and call you on ${p.customer.phone} before we dispatch.`
      : `Thank you for your order. We have it, and we will call you on ${p.customer.phone} to confirm before we dispatch.`,
    "",
    `Order number: ${formatOrderNo(p.orderNo)}`,
    `Placed: ${inIst(p.placedAt)} IST`,
    "",
    "ITEMS",
    ...itemLines(p),
    "",
    `  Subtotal  ${formatInr(p.subtotalPaise)}`,
    `  Shipping  ${p.shippingPaise === 0 ? "Free" : formatInr(p.shippingPaise)}`,
    p.paymentMethod === "cod"
      ? `  PAY ON DELIVERY  ${formatInr(p.totalPaise)}`
      : p.paymentMethod === "upi"
        ? `  PAID BY UPI  ${formatInr(p.totalPaise)}`
        : `  PAID  ${formatInr(p.totalPaise)}`,
    "",
    "DELIVERING TO",
    ...addressLines(p).map((line) => `  ${line}`),
    "",
    `Track or ask about this order: ${env.siteUrl()}/order/${p.orderId}`,
    "",
    "Questions? Reply to this email, or message us on WhatsApp at +91 8178902630.",
    "",
    "VoltLabs",
  ].join("\n");

const customerHtml = (p: OrderEmailPayload): string => `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;color:#14181f">
  <h2 style="margin:0 0 12px">Thank you for your order</h2>
  <p style="margin:0 0 18px;line-height:1.6">
    Hi ${esc(p.customer.name.split(" ")[0])}, we have your order and will call you on
    ${esc(p.customer.phone)} to confirm before dispatch.
  </p>
  <p style="margin:0 0 20px;padding:12px 16px;border-radius:8px;background:#fdf4e3">
    <strong>Order ${formatOrderNo(p.orderNo)}</strong><br>
    <span style="color:#5a6472;font-size:14px">${esc(inIst(p.placedAt))} IST</span>
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${p.items
      .map(
        (item) => `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc">${item.quantity} &times; ${esc(item.productName)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #e3e1dc;text-align:right">${esc(formatInr(item.lineTotalPaise))}</td>
    </tr>`,
      )
      .join("")}
    <tr>
      <td style="padding:6px 0">Shipping</td>
      <td style="padding:6px 0;text-align:right">${p.shippingPaise === 0 ? "Free" : esc(formatInr(p.shippingPaise))}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-weight:700;border-top:2px solid #14181f">
        ${p.paymentMethod === "cod" ? "Pay on delivery" : p.paymentMethod === "upi" ? "Paid by UPI" : "Paid"}
      </td>
      <td style="padding:8px 0;font-weight:700;text-align:right;border-top:2px solid #14181f">${esc(formatInr(p.totalPaise))}</td>
    </tr>
  </table>
  <h3 style="margin:22px 0 6px;font-size:15px">Delivering to</h3>
  <p style="margin:0 0 22px;line-height:1.6">${addressLines(p).map(esc).join("<br>")}</p>
  <p style="margin:0 0 8px">
    <a href="${esc(env.siteUrl())}/order/${esc(p.orderId)}" style="color:#96610c">View your order</a>
  </p>
  <p style="margin:22px 0 0;color:#5a6472;font-size:14px;line-height:1.6">
    Questions? Reply to this email, or message us on WhatsApp at +91 8178902630.
  </p>
</div>`;

/** Confirms the order to the customer. */
export const sendCustomerConfirmation = async (p: OrderEmailPayload) =>
  sendMail({
    to: p.customer.email,
    subject: `Your VoltLabs order ${formatOrderNo(p.orderNo)} is confirmed`,
    text: customerText(p),
    html: customerHtml(p),
    replyTo: env.email.notificationAddress(),
  });
