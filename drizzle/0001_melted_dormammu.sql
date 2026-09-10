ALTER TYPE "public"."payment_method" ADD VALUE 'upi';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "upi_reference" text;