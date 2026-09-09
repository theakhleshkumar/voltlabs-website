/**
 * Environment configuration, validated on first use.
 *
 * Two rules learned the hard way:
 *
 * 1. Nothing is read at import time. `next build` loads every route module to
 *    collect configuration, so throwing on import breaks the production build
 *    wherever the variables are not present -- including in CI.
 * 2. Variables are grouped by feature, so a missing Razorpay key cannot stop
 *    cash-on-delivery orders from being taken.
 *
 * This file is also the checklist for the AWS move: everything the app needs
 * from its environment is named here and nowhere else.
 */

class ConfigError extends Error {}

const read = (name: string): string | undefined => {
  const value = process.env[name];
  return value && value.trim() !== "" ? value.trim() : undefined;
};

const require_ = (name: string, hint: string): string => {
  const value = read(name);
  if (!value) {
    throw new ConfigError(`${name} is not set. ${hint} See .env.example.`);
  }
  return value;
};

export const env = {
  /** Postgres connection string. Neon's pooled endpoint now, RDS later. */
  databaseUrl: () =>
    require_("DATABASE_URL", "The app cannot store orders without a database."),

  /** Absolute site URL, used in emails and redirects. */
  siteUrl: () => read("NEXT_PUBLIC_SITE_URL") ?? "https://voltlabs.in",

  isProduction: () => process.env.NODE_ENV === "production",

  smtp: {
    /**
     * Any SMTP server: the domain mailbox today, AWS SES tomorrow. SES gives
     * you an SMTP host and credentials, so the switch touches only these values.
     */
    config: () => ({
      host: require_("SMTP_HOST", "Your mail provider's outgoing server."),
      port: Number(read("SMTP_PORT") ?? 587),
      user: require_("SMTP_USER", "Usually the full mailbox address."),
      password: require_("SMTP_PASSWORD", "The mailbox password or app password."),
      // 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: read("SMTP_SECURE") === "true" || Number(read("SMTP_PORT") ?? 587) === 465,
    }),
    from: () => read("MAIL_FROM") ?? `VoltLabs <${read("SMTP_USER") ?? "orders@voltlabs.in"}>`,
    isConfigured: () =>
      Boolean(read("SMTP_HOST") && read("SMTP_USER") && read("SMTP_PASSWORD")),
  },

  email: {
    /** Where new order notifications and contact messages go. */
    notificationAddress: () => read("ORDER_NOTIFICATION_EMAIL") ?? "admin@voltlabs.in",
  },

  admin: {
    password: () =>
      require_("ADMIN_PASSWORD", "Set a long random string to protect /admin."),
    /** Signs the admin session cookie. Changing it logs everyone out. */
    sessionSecret: () =>
      require_("ADMIN_SESSION_SECRET", "Set a long random string, at least 32 characters."),
    isConfigured: () => Boolean(read("ADMIN_PASSWORD") && read("ADMIN_SESSION_SECRET")),
  },

  razorpay: {
    keyId: () => require_("RAZORPAY_KEY_ID", "Razorpay dashboard, Settings, API Keys."),
    keySecret: () =>
      require_("RAZORPAY_KEY_SECRET", "Shown once when the key is generated."),
    webhookSecret: () =>
      require_("RAZORPAY_WEBHOOK_SECRET", "The secret you chose when creating the webhook."),
    /** Online payment is only offered when Razorpay is fully configured. */
    isConfigured: () =>
      Boolean(read("RAZORPAY_KEY_ID") && read("RAZORPAY_KEY_SECRET")),
  },
} as const;

export interface ConfigCheck {
  name: string;
  ok: boolean;
  required: boolean;
  detail: string;
}

/**
 * Reports what is and is not configured. Used by the health endpoint so a
 * misconfigured deployment is visible immediately rather than at the moment a
 * customer tries to check out.
 */
export const checkConfiguration = (): ConfigCheck[] => [
  {
    name: "database",
    ok: Boolean(read("DATABASE_URL")),
    required: true,
    detail: "DATABASE_URL — orders cannot be saved without it",
  },
  {
    name: "email",
    ok: env.smtp.isConfigured(),
    required: false,
    detail: "SMTP_HOST, SMTP_USER and SMTP_PASSWORD — mail is logged instead of sent",
  },
  {
    name: "adminPanel",
    ok: env.admin.isConfigured(),
    required: false,
    detail: "ADMIN_PASSWORD and ADMIN_SESSION_SECRET — /admin is unavailable without them",
  },
  {
    name: "onlinePayment",
    ok: env.razorpay.isConfigured(),
    required: false,
    detail: "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET — only cash on delivery is offered",
  },
];
