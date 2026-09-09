import nodemailer, { type Transporter } from "nodemailer";
import { env } from "./env";
import { logger } from "./logger";

/**
 * SMTP transport -- the only place in the app that talks to a mail server.
 *
 * SMTP rather than a vendor API on purpose: AWS SES exposes an SMTP endpoint,
 * so moving off the current mailbox is a change of four environment variables
 * and no code at all. A vendor SDK would have to be torn out instead.
 */

type Mailer = Transporter;

// Next.js re-evaluates modules on hot reload, which would otherwise open a new
// connection pool every time a file is saved.
const globalForMail = globalThis as unknown as { mailer?: Mailer };

const create = (): Mailer => {
  const { host, port, user, password, secure } = env.smtp.config();

  return nodemailer.createTransport({
    host,
    port,
    // Port 465 is implicit TLS; 587 and 25 start plaintext and upgrade with
    // STARTTLS. Getting this backwards is the usual cause of a silent hang.
    secure,
    auth: { user, pass: password },
    // A serverless invocation sends one or two messages and exits; holding a
    // pool open just leaves connections stranded on the mail server.
    pool: false,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
};

const getMailer = (): Mailer => {
  if (!globalForMail.mailer) globalForMail.mailer = create();
  return globalForMail.mailer;
};

export interface SendArgs {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export interface SendResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends one message. Never throws: callers are usually finishing an order that
 * is already saved, and a mail server having a bad minute must not turn a real
 * order into an error page.
 */
export const sendMail = async (args: SendArgs): Promise<SendResult> => {
  if (!env.smtp.isConfigured()) {
    // Log the whole message so nothing is lost while SMTP is unconfigured.
    logger.warn("mail.not_configured", {
      to: args.to,
      subject: args.subject,
      body: args.text,
    });
    return { sent: false, error: "SMTP is not configured" };
  }

  try {
    const info = await getMailer().sendMail({
      from: env.smtp.from(),
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      replyTo: args.replyTo,
    });

    logger.info("mail.sent", { to: args.to, subject: args.subject, messageId: info.messageId });
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    logger.error("mail.failed", {
      to: args.to,
      subject: args.subject,
      error,
      // Repeat the body so a failed message stays recoverable from the logs.
      body: args.text,
    });
    return {
      sent: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

/** Used by the health check to prove the mail server is actually reachable. */
export const verifySmtp = async (): Promise<{ ok: boolean; error?: string }> => {
  if (!env.smtp.isConfigured()) return { ok: false, error: "SMTP is not configured" };
  try {
    await getMailer().verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
};
