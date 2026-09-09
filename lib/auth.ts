import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

/**
 * Admin authentication.
 *
 * A single shared password today, held in an env var and exchanged for a
 * signed, http-only session cookie. That is deliberately modest: it protects
 * /admin from the internet without adding a user table, an email flow and a
 * password reset that all get thrown away when Cognito arrives.
 *
 * Everything else in the app calls only `isAdminAuthenticated` and
 * `requireAdmin`. Swapping to Cognito means rewriting the body of those two
 * functions to validate a JWT -- no page or route changes.
 */

const COOKIE = "vl_admin_session";
const SESSION_HOURS = 12;

const sign = (payload: string): string =>
  createHmac("sha256", env.admin.sessionSecret()).update(payload).digest("hex");

const constantTimeEquals = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
};

/** Verifies the submitted password without leaking length or content by timing. */
export const verifyAdminPassword = (submitted: string): boolean => {
  const expected = env.admin.password();
  // Hash both sides first so the compare is over equal-length digests and a
  // wrong-length guess cannot be distinguished from a wrong-value one.
  const hash = (value: string) => createHmac("sha256", "pw").update(value).digest("hex");
  return constantTimeEquals(hash(expected), hash(submitted));
};

export const createSessionToken = (): string => {
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  // The nonce makes each session distinct, so one leaked cookie cannot be
  // recognised as identical to another.
  const payload = `${expiresAt}.${randomBytes(12).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
};

const isValidToken = (token: string | undefined): boolean => {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  const payload = `${expiresAt}.${nonce}`;

  if (!constantTimeEquals(sign(payload), signature)) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
};

export const ADMIN_COOKIE_NAME = COOKIE;
export const ADMIN_SESSION_MAX_AGE = SESSION_HOURS * 60 * 60;

/** True when the current request carries a valid admin session. */
export const isAdminAuthenticated = async (): Promise<boolean> => {
  if (!env.admin.isConfigured()) return false;
  try {
    const store = await cookies();
    return isValidToken(store.get(COOKIE)?.value);
  } catch {
    return false;
  }
};

export class UnauthorizedError extends Error {
  constructor() {
    super("Admin authentication required.");
  }
}

/** Throws unless the caller holds a valid admin session. */
export const requireAdmin = async (): Promise<void> => {
  if (!(await isAdminAuthenticated())) throw new UnauthorizedError();
};
