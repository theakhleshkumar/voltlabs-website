import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/auth";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { clientIpFrom, hashIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  if (!env.admin.isConfigured()) {
    return NextResponse.json(
      { error: "The admin panel is not configured on this deployment." },
      { status: 503 },
    );
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter your password." }, { status: 400 });
  }

  if (!verifyAdminPassword(parsed.data.password)) {
    // Logged with a hashed IP so repeated attempts are visible without
    // recording anyone's address.
    logger.warn("admin.login_failed", { ipHash: hashIp(clientIpFrom(request)) });
    // A deliberate pause; brute forcing a single shared password should not be
    // something you can do at request speed.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  logger.info("admin.login_succeeded", {});

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction(),
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
