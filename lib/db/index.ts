import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * The only file in the app that knows which Postgres it is talking to.
 *
 * It deliberately uses the standard Postgres wire protocol (postgres-js) and
 * not Neon's proprietary HTTP driver. Neon's driver is faster to set up but
 * ties the codebase to Neon; the wire protocol is spoken by Neon's pooled
 * endpoint today and by RDS Proxy or Aurora later, so moving to AWS is a
 * change of DATABASE_URL rather than a change of code.
 *
 * Point DATABASE_URL at Neon's POOLED connection string (it has "-pooler" in
 * the host). The direct endpoint runs out of connections under serverless.
 */

type Database = ReturnType<typeof drizzle<typeof schema>>;

// Next.js recreates modules on every hot reload in development, which would
// otherwise open a new pool each time until Postgres refuses connections.
const globalForDb = globalThis as unknown as {
  pgClient?: ReturnType<typeof postgres>;
  drizzleDb?: Database;
};

const connect = (): Database => {
  if (globalForDb.drizzleDb) return globalForDb.drizzleDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }

  const client =
    globalForDb.pgClient ??
    postgres(connectionString, {
      // A serverless invocation handles one request; a large pool per instance
      // just exhausts the server's connection limit.
      max: 1,
      // PgBouncer in transaction mode cannot support prepared statements.
      prepare: false,
    });

  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pgClient = client;
    globalForDb.drizzleDb = instance;
  }

  return instance;
};

/**
 * Connects on first use rather than on import. `next build` loads every route
 * module to collect its configuration, so connecting at import time would make
 * the production build fail wherever DATABASE_URL is not present -- including
 * in CI. Routes still use `db.select(...)` exactly as if it were eager.
 */
export const db = new Proxy({} as Database, {
  get(_target, property, receiver) {
    const instance = connect();
    const value = Reflect.get(instance, property, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export { schema };
