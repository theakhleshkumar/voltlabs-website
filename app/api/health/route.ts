import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { checkConfiguration } from "@/lib/env";

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

  // Only the database is fatal. Missing email means orders are logged rather
  // than mailed, which is degraded but still takes money.
  const healthy = database.ok;
  const degraded = config.some((check) => !check.required && !check.ok);

  return NextResponse.json(
    {
      status: healthy ? (degraded ? "degraded" : "ok") : "unhealthy",
      time: new Date().toISOString(),
      database,
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
