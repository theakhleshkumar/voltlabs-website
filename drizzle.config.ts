import { defineConfig } from "drizzle-kit";

// Migrations are generated into ./drizzle and committed, so dev and production
// apply exactly the same SQL in the same order. Schema drift between the two
// stops being a matter of discipline.
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
