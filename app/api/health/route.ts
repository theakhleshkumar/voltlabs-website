import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { checkConfiguration, env } from "@/lib/env";
import { verifySmtp } from "@/lib/mailer";

/**
 * Health check.
 *
 * Reports whether the app can actually serve orders, not merely whether the
 * process is up. An AWS target group, an uptime monitor, or you at 9am can all
 * read the same answer.
 *
 * Deliberately says what is misconfigured but never what the values are.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const config = checkConfiguration();

  let database: { ok: boolean; latencyMs?: number; error?: string };
  const started = Date.now();
  try {
    await db.execute(sql`select 1`);
    database = { ok: true, latencyMs: Date.now() - started };
  } catch (error) {
    database = {
      ok: false,
      error: error instanceof Error ? error.message : "unreachable",
    };
  }

  // Actually talk to the mail server rather than just checking that variables
  // exist: wrong credentials or a blocked port look identical to configured.
  const smtp = env.smtp.isConfigured()
    ? await verifySmtp()
    : { ok: false, error: "SMTP is not configured" };

  // Only the database is fatal. Unreachable mail means orders are logged rather
  // than mailed, which is degraded but still takes money.
  const healthy = database.ok;
  const degraded = !smtp.ok || config.some((check) => !check.required && !check.ok);

  return NextResponse.json(
    {
      status: healthy ? (degraded ? "degraded" : "ok") : "unhealthy",
      time: new Date().toISOString(),
      database,
      smtp,
      configuration: config.map(({ name, ok, required, detail }) => ({
        name,
        ok,
        required,
        ...(ok ? {} : { detail }),
      })),
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
