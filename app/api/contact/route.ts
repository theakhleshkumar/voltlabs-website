import { NextResponse } from "next/server";
import { and, count, eq, gte } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { sendMail } from "@/lib/mailer";
import { clientIpFrom, hashIp } from "@/lib/rate-limit";

/**
 * Contact form.
 *
 * Replaces the third-party form service the site used to post to directly from
 * the browser. Messages are now stored first and emailed second, so a mail
 * outage cannot lose an enquiry, and spam is handled here rather than by a
 * vendor whose free tier did not actually enforce its captcha server-side.
 *
 * Three cheap defences instead of a captcha:
 *   - a honeypot field that people never see and bots fill in
 *   - a minimum time on the form, since scripts submit instantly
 *   - a rate limit per IP, counted in the database
 */

export const runtime = "nodejs";

const WINDOW_MINUTES = 60;
const MAX_PER_IP = 5;
const MIN_SECONDS_ON_FORM = 3;

const SUBJECTS = [
  "Product Inquiry",
  "Order Support",
  "Technical Support",
  "Bulk Order",
  "Partnership",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(2, "Choose a subject.").max(80),
  message: z.string().trim().min(10, "Tell us a little more.").max(4000),
  /** Milliseconds since the form was rendered. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Honeypot: hidden from people, irresistible to bots. */
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    const fields: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path.at(-1) ?? "form");
      (fields[key] ??= []).push(issue.message);
    }
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message, elapsedMs } = parsed.data;

  // Anything submitted faster than a person can type was not typed by one.
  if (elapsedMs !== undefined && elapsedMs < MIN_SECONDS_ON_FORM * 1000) {
    logger.warn("contact.too_fast", { elapsedMs });
    return NextResponse.json(
      { error: "That was submitted a little too quickly. Please try again." },
      { status: 400 },
    );
  }

  // Keep the value on the list the form offers rather than trusting the client.
  const safeSubject = (SUBJECTS as readonly string[]).includes(subject) ? subject : "Other";

  const ipHash = hashIp(clientIpFrom(request));

  if (ipHash) {
    try {
      const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
      const [{ recent }] = await db
        .select({ recent: count() })
        .from(contactMessages)
        .where(and(eq(contactMessages.ipHash, ipHash), gte(contactMessages.createdAt, since)));

      if (recent >= MAX_PER_IP) {
        logger.warn("contact.rate_limited", { ipHash });
        return NextResponse.json(
          {
            error:
              "You have sent several messages recently. Please wait a little while, or reach us on WhatsApp.",
          },
          { status: 429 },
        );
      }
    } catch (error) {
      // Never block a genuine message because the check itself failed.
      logger.error("contact.rate_limit_check_failed", { error });
    }
  }

  let saved;
  try {
    [saved] = await db
      .insert(contactMessages)
      .values({
        name,
        email,
        phone: phone || null,
        subject: safeSubject,
        message,
        ipHash,
      })
      .returning();
  } catch (error) {
    logger.error("contact.persist_failed", { error });
    return NextResponse.json(
      { error: "We could not send your message. Please email support@voltlabs.in." },
      { status: 500 },
    );
  }

  logger.info("contact.received", { id: saved.id, subject: safeSubject });

  const text = [
    `Subject: ${safeSubject}`,
    "",
    "FROM",
    `  ${name}`,
    `  ${email}`,
    ...(phone ? [`  ${phone}`] : []),
    "",
    "MESSAGE",
    message,
    "",
    `Received ${saved.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ].join("\n");

  const esc = (value: string) =>
    value.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
    );

  const result = await sendMail({
    to: env.email.notificationAddress(),
    subject: `Website enquiry: ${safeSubject} — ${name}`,
    text,
    // Replying goes straight back to whoever wrote in.
    replyTo: email,
    html: `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;color:#14181f">
  <h2 style="margin:0 0 4px">${esc(safeSubject)}</h2>
  <p style="margin:0 0 18px;color:#5a6472;font-size:14px">
    ${esc(saved.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))} IST
  </p>
  <p style="margin:0 0 18px;line-height:1.6">
    <strong>${esc(name)}</strong><br>
    <a href="mailto:${esc(email)}">${esc(email)}</a>
    ${phone ? `<br><a href="tel:${esc(phone)}">${esc(phone)}</a>` : ""}
  </p>
  <div style="padding:14px 16px;border-radius:8px;background:#f4f3f0;white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
</div>`,
  });

  if (result.sent) {
    await db
      .update(contactMessages)
      .set({ emailed: true })
      .where(eq(contactMessages.id, saved.id))
      .catch(() => undefined);
  }

  // The message is stored either way, so the sender always sees success.
  return NextResponse.json({ ok: true });
}
