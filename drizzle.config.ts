import { loadEnvFile } from "node:process";
import { defineConfig } from "drizzle-kit";

/**
 * Next.js loads .env.local automatically; the drizzle-kit CLI does not, so it
 * would otherwise report DATABASE_URL as undefined even with the file sitting
 * right there. Missing file is fine -- in CI and on Vercel the variables come
 * from the real environment.
 */
try {
  loadEnvFile(".env.local");
} catch {
  // No .env.local here; fall through to process.env.
}

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
