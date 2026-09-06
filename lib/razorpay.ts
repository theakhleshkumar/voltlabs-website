import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Server-only Razorpay helpers. Deliberately plain fetch plus node:crypto
 * rather than the SDK -- the surface used here is small, and this keeps the
 * module portable to Lambda without carrying a dependency.
 *
 * Nothing in this file may be imported from a client component: it reads
 * RAZORPAY_KEY_SECRET.
 */

const API = "https://api.razorpay.com/v1";

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. See .env.example.`);
  return value;
};

/** Safe to expose to the browser -- the checkout script needs it. */
export const getPublicKeyId = (): string => requireEnv("RAZORPAY_KEY_ID");

const authHeader = (): string => {
  const id = requireEnv("RAZORPAY_KEY_ID");
  const secret = requireEnv("RAZORPAY_KEY_SECRET");
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
};

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

/**
 * Creates the order on Razorpay's side. `amountPaise` must always be computed
 * from the server-side catalogue -- never from a number the browser sent.
 */
export const createRazorpayOrder = async (params: {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> => {
  const response = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amountPaise,
      currency: params.currency,
      receipt: params.receipt,
      notes: params.notes,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Razorpay order creation failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as RazorpayOrder;
};

/** Constant-time compare, so a wrong signature cannot be probed byte by byte. */
const signaturesMatch = (expected: string, received: string): boolean => {
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
};

/**
 * Verifies the handshake the browser hands back after a successful payment.
 * Razorpay signs `order_id|payment_id` with the key secret.
 */
export const verifyCheckoutSignature = (params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  signature: string;
}): boolean => {
  const expected = createHmac("sha256", requireEnv("RAZORPAY_KEY_SECRET"))
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");

  return signaturesMatch(expected, params.signature);
};

/**
 * Verifies a webhook call. The raw request body must be passed exactly as
 * received -- parsing and re-serialising it changes the bytes and the
 * signature will never match.
 */
export const verifyWebhookSignature = (params: {
  rawBody: string;
  signature: string;
}): boolean => {
  const expected = createHmac("sha256", requireEnv("RAZORPAY_WEBHOOK_SECRET"))
    .update(params.rawBody)
    .digest("hex");

  return signaturesMatch(expected, params.signature);
};
