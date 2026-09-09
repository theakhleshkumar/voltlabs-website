/**
 * Structured logging.
 *
 * Emits one JSON object per line. CloudWatch Logs Insights parses that natively,
 * so `fields @timestamp, orderNo | filter event = "order.placed"` works the day
 * the app moves to AWS without touching a single call site. Vercel's log viewer
 * handles it equally well today.
 *
 * Plain console.log strings would have to be rewritten into something queryable
 * later; this is the cheapest thing that avoids that.
 */

type Level = "debug" | "info" | "warn" | "error";

type Fields = Record<string, unknown>;

const SENSITIVE = /^(password|secret|token|authorization|key|signature|cookie)$/i;

/** Keeps credentials out of logs even when an object is passed in wholesale. */
const redact = (fields: Fields): Fields => {
  const safe: Fields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (SENSITIVE.test(key)) {
      safe[key] = "[redacted]";
    } else if (value instanceof Error) {
      safe[key] = { name: value.name, message: value.message, stack: value.stack };
    } else {
      safe[key] = value;
    }
  }
  return safe;
};

const write = (level: Level, event: string, fields: Fields = {}) => {
  const line = JSON.stringify({
    level,
    event,
    time: new Date().toISOString(),
    ...redact(fields),
  });

  // console is the transport on both Vercel and Lambda: stdout is collected
  // automatically in each. Nothing here needs to change on AWS.
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
};

export const logger = {
  debug: (event: string, fields?: Fields) => {
    if (process.env.NODE_ENV !== "production") write("debug", event, fields);
  },
  info: (event: string, fields?: Fields) => write("info", event, fields),
  warn: (event: string, fields?: Fields) => write("warn", event, fields),
  error: (event: string, fields?: Fields) => write("error", event, fields),
};
