import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Money is stored in paise as integers, never rupees as floats. 799 rupees is
 * 79900. Razorpay's API also works in paise, so amounts pass through without a
 * conversion step where rounding could creep in.
 */

export const orderStatus = pgEnum("order_status", [
  "pending", // placed; COD awaiting confirmation, online awaiting payment
  "confirmed", // COD confirmed by phone, ready to dispatch
  "paid", // money received (online at checkout, COD on delivery)
  "failed",
  "cancelled",
  "shipped",
  "delivered",
  "refunded",
]);

export const paymentMethod = pgEnum("payment_method", ["cod", "online"]);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Human-readable reference for support and couriers: VL-00001.
    orderNo: serial("order_no").notNull(),
    status: orderStatus("status").notNull().default("pending"),
    paymentMethod: paymentMethod("payment_method").notNull().default("cod"),

    // Razorpay linkage, null for cash on delivery. Unique so a replayed
    // webhook cannot create a second row for the same payment; Postgres allows
    // many nulls in a unique column, so COD orders do not collide.
    razorpayOrderId: text("razorpay_order_id").unique(),
    razorpayPaymentId: text("razorpay_payment_id"),
    razorpaySignature: text("razorpay_signature"),

    currency: text("currency").notNull().default("INR"),
    subtotalPaise: integer("subtotal_paise").notNull(),
    shippingPaise: integer("shipping_paise").notNull().default(0),
    totalPaise: integer("total_paise").notNull(),

    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),

    // Shaped to what Shiprocket and Delhivery need for a shipping label, so
    // fulfilment later is an export rather than a data migration.
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    country: text("country").notNull().default("India"),

    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_status_idx").on(table.status),
    index("orders_created_at_idx").on(table.createdAt),
    index("orders_customer_email_idx").on(table.customerEmail),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),

    productSlug: text("product_slug").notNull(),

    /**
     * Name and unit price are snapshots taken when the order was placed. They
     * deliberately duplicate the catalogue: repricing a lamp next month must
     * not silently rewrite what a customer was charged last month.
     */
    productName: text("product_name").notNull(),
    unitPricePaise: integer("unit_price_paise").notNull(),

    quantity: integer("quantity").notNull(),
    lineTotalPaise: integer("line_total_paise").notNull(),
  },
  (table) => [index("order_items_order_id_idx").on(table.orderId)],
);

/**
 * Razorpay retries webhooks until it gets a 2xx, so the same event can arrive
 * several times. Recording each event id and ignoring duplicates keeps
 * processing idempotent.
 */
export const webhookEvents = pgTable("webhook_events", {
  id: text("id").primaryKey(), // Razorpay's x-razorpay-event-id
  event: text("event").notNull(),
  payload: jsonb("payload"),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
