import { createHmac } from "node:crypto";
import { and, count, eq, gte, or } from "drizzle-orm";
import { db } from "./db";
import { orders } from "./db/schema";

/**
 * Order rate limiting.
 *
 * Counts recent orders in the database rather than keeping counters in memory.
 * In-memory limits are close to useless in serverless: each invocation may be a
 * fresh instance with an empty map, so an attacker just gets a new bucket every
 * request. A query works across every instance, and works identically on Lambda
 * after the AWS move.
 *
 * These are anti-abuse limits, not anti-fraud. They stop a bored person filling
 * the order book; they do not verify that a phone number belongs to anyone.
 */

const WINDOW_MINUTES = 30;
const MAX_PER_PHONE = 3;
const MAX_PER_IP = 6;

/**
 * Hashes the caller's IP with the session secret as salt, so the stored value
 * cannot be reversed into an address by anyone reading the table.
 */
export const hashIp = (ip: string | null): string | null => {
  if (!ip) return null;
  const salt = process.env.ADMIN_SESSION_SECRET ?? "voltlabs-fallback-salt";
  return createHmac("sha256", salt).update(ip).digest("hex").slice(0, 32);
};

/** Best-effort client IP. Proxies on both Vercel and CloudFront set these. */
export const clientIpFrom = (request: Request): string | null => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip");
};

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

export const checkOrderRateLimit = async (params: {
  phone: string;
  ipHash: string | null;
}): Promise<RateLimitResult> => {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

  const matchesCaller = params.ipHash
    ? or(eq(orders.customerPhone, params.phone), eq(orders.ipHash, params.ipHash))
    : eq(orders.customerPhone, params.phone);

  const [{ recent }] = await db
    .select({ recent: count() })
    .from(orders)
    .where(and(gte(orders.createdAt, since), matchesCaller));

  // A single combined count keeps this to one query. The phone limit is the
  // tighter of the two, so use it when there is no IP to go on.
  const limit = params.ipHash ? MAX_PER_IP : MAX_PER_PHONE;

  if (recent >= limit) {
    return {
      allowed: false,
      reason:
        "You have placed several orders in the last few minutes. Please wait a little while, or contact us on WhatsApp if you need help.",
    };
  }

  return { allowed: true };
};
