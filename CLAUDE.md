# VoltLabs — project handover

Marketing site and direct-to-customer store for VoltLabs, a smart-lighting
brand in India. Sells three touch lamps, takes orders by cash on delivery and
UPI, and is run day to day from a built-in admin panel.

Live at **https://voltlabs.in** · deployed from `main` on Vercel · repo
`github.com/theakhleshkumar/voltlabs-website`.

This file is the complete context. Read it before changing anything — most of
what follows was learned by hitting the problem, and rediscovering it costs
hours.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) |
| Database | PostgreSQL on Neon (`ap-southeast-1`), via Drizzle ORM |
| Email | SMTP through Gmail, via nodemailer |
| Hosting | Vercel, function region `sin1` (Singapore) |
| Payments | Cash on delivery + static UPI QR. Razorpay is built but switched off |

Node 24 is what this was developed against. `process.loadEnvFile` is used in
`drizzle.config.ts`, which needs Node 20.12+.

---

## 2. Getting running on a new machine

```bash
npm install
cp .env.example .env.local      # then fill it in, see §3
npm run db:migrate              # creates tables in the Neon database
npm run dev                     # http://localhost:3000
```

Then open `http://localhost:3000/api/health`. It should report
`database.ok: true` and `smtp.ok: true`. **Always check this first when
something is wrong** — it tells you exactly which piece is misconfigured
instead of leaving you guessing between a bad connection string, a missing
migration, and a broken deploy. It never reveals any secret values.

Useful commands:

```bash
npm run lint          # eslint
npx tsc --noEmit      # typecheck
npm run build         # production build; also typechecks
npm run db:generate   # create a migration after changing lib/db/schema.ts
npm run db:migrate    # apply pending migrations
npm run db:studio     # browse the database in a GUI
```

---

## 3. Environment variables

`.env.example` is the canonical list and explains each one. `.env.local` is
gitignored; `.env.example` is deliberately exempted from that rule.

**Required**

- `DATABASE_URL` — Neon **pooled** connection string (host contains
  `-pooler`), database name `voltlabs`, with `?sslmode=require`.
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` locally,
  `https://voltlabs.in` in production. It builds the order link inside
  customer emails; get it wrong and customers are sent to your laptop.

**Admin panel** — without these, `/admin` shows a "not configured" notice.

- `ADMIN_PASSWORD` — what you type to sign in.
- `ADMIN_SESSION_SECRET` — signs the session cookie, never typed by anyone.
  Changing it signs everyone out. Also salts the IP hashes.

Generate with:
`node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`

**Email** — without these, orders and messages are still saved, but written to
the log instead of sent.

- `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER`, `SMTP_PASSWORD`
- `MAIL_FROM` — display name plus address.
- `ORDER_NOTIFICATION_EMAIL` — where orders and contact messages arrive.

**Razorpay** — optional. Online payment is hidden from checkout unless
`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are both present.

### Vercel

Same variables, scoped to **Production**. Mark `DATABASE_URL`,
`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` and `SMTP_PASSWORD` as **Secret**;
the rest as Config. Use **different** admin values than local.

> **Vercel injects environment variables at build time.** Adding or changing
> one does nothing to the running deployment — you must redeploy. This already
> cost one live outage: the site was up, the health check said
> `DATABASE_URL is not set`, and every order failed with "We could not save
> your order."

Keep the function region on **Singapore (`sin1`)** so it sits beside the Neon
database. Warm queries are 38–75 ms. On the US default they would cross the
Pacific twice per query.

---

## 4. Architecture, and why

Each external dependency sits behind exactly one module, so swapping it is a
contained change. This was deliberate: the plan is to move onto AWS (§12).

| Concern | Module | What changes on AWS |
|---|---|---|
| Database | `lib/db/index.ts` | A new `DATABASE_URL`, nothing else |
| Email | `lib/mailer.ts` | SES credentials; SES speaks SMTP, so no code |
| Admin auth | `lib/auth.ts` | Two function bodies, to validate a Cognito JWT |
| Config | `lib/env.ts` | Same names, read from Secrets Manager |
| Logging | `lib/logger.ts` | Nothing; CloudWatch parses the JSON already |

There is **no Vercel-specific API anywhere in the codebase.** Keep it that
way, and keep Amplify-specific libraries out too — that portability is the
whole escape hatch.

### Directory map

```
app/
  page.tsx                     homepage (client component; contact form lives here)
  layout.tsx                   metadata, fonts, no-flash theme script
  checkout/[slug]/             checkout page, prerendered per product
  order/[id]/                  order confirmation, dynamic
  admin/                       order dashboard, dynamic
  product/[slug]/              product pages, SSG
  api/orders/                  place an order
  api/orders/verify/           Razorpay browser callback (dormant)
  api/webhooks/razorpay/       Razorpay webhook (dormant)
  api/contact/                 contact form
  api/admin/login/             admin sign in and out
  api/admin/orders/[id]/       change an order's status
  api/health/                  configuration and connectivity report
  {privacy,terms-of-service,refund,shipping}-policy/
components/
  CheckoutForm.tsx             the whole checkout UI, client
  ThemeToggle.tsx              dark/light switch
  admin/                       admin login, order row, sign out
lib/
  db/schema.ts                 Drizzle schema — the source of truth for tables
  db/index.ts                  the only file that knows which Postgres this is
  pricing.ts                   server-side prices; UPI constants
  products.ts                  the catalogue, hardcoded (see §11)
  email.ts                     what each message says
  mailer.ts                    how mail is sent (SMTP)
  auth.ts                      admin session
  env.ts                       every environment variable, validated lazily
  logger.ts                    structured JSON logs
  rate-limit.ts                abuse limits, counted in the database
  razorpay.ts                  order creation and signature verification
  theme.ts                     theme storage key and the no-flash script
```

---

## 5. Theming — read before touching CSS

The site has a dark/light toggle. The implementation is unusual, and editing
`app/globals.css` without understanding it will break things.

**The problem.** The pages style themselves with literal Tailwind utilities
(`bg-white`, `text-gray-600`) rather than semantic tokens — roughly 460 of
them. Adding a `dark:` variant to each was not viable.

**The mechanism.** Tailwind v4 compiles `.text-gray-600` to
`color: var(--color-gray-600)`. Every variant of that utility — `hover:`,
`focus:`, `group-hover:` — reads the same variable. So `.dark` in
`globals.css` redefines the grey ramp itself, and the whole site flips with no
specificity fights and no hover states breaking.

The ramp is remapped **by role, not inverted**: 500–900 are body-text shades
and become light; 50–300 are surface and border shades and become dark. 400 is
left alone, since it reads as muted on either ground.

**`data-theme-fixed`.** Sections that are already dark or brand-coloured in
light mode must not flip — the hero, the about band, the orange CTAs, the
footers, the product photo plates, and the UPI QR. Putting
`data-theme-fixed` on such an element restores the stock palette for its whole
subtree through CSS variable inheritance. There are 15 of these.

> The UPI QR **must** stay on a white plate. An inverted QR fails to scan on
> many phones.

`bg-white` is the one utility that cannot ride on a variable, because it
shares `--color-white` with `text-white` and `border-white`, which must stay
white on brand-coloured chips. It is handled by a few unlayered rules at the
end of `globals.css`. **Those rules beat Tailwind's layered `:hover`**, so any
element that has both `bg-white` and a `hover:bg-*` needs its hover restated
there. Only two exist today; the file says so.

An earlier attempt overrode the utility classes directly and silently broke
30+ hover states. Don't go back to that.

---

## 6. Database

Schema lives in `lib/db/schema.ts`. Migrations are generated into `drizzle/`
and **committed**, so dev and production apply identical SQL in the same
order.

```bash
# after editing lib/db/schema.ts
npm run db:generate    # writes drizzle/000N_*.sql
npm run db:migrate     # applies it
```

Tables: `orders`, `order_items`, `contact_messages`, `webhook_events`.

Things that matter:

- **Money is stored in paise as integers, never rupees as floats.** ₹799 is
  `79900`. Razorpay uses paise too, so amounts pass through unconverted.
- **`order_items` snapshots the product name and unit price.** It deliberately
  duplicates the catalogue: repricing a lamp next month must not rewrite what
  a customer was charged last month.
- **`ip_hash` is a salted hash, never an address.** Enough to rate limit
  without holding personal data.
- `razorpay_order_id` is nullable and unique. Postgres allows many nulls in a
  unique column, so COD and UPI orders don't collide.
- `upi_reference` exists but checkout no longer collects it (§8).

> A Postgres enum can only be **appended** to. `payment_method` is
> `["cod", "online", "upi"]` in that order for that reason, not by preference.

The connection is **lazy** — it opens on first use, not on import.
`next build` loads every route module to collect configuration, so connecting
at import time makes the production build fail wherever `DATABASE_URL` is
absent, including CI. Don't "simplify" that away.

`drizzle.config.ts` calls `loadEnvFile(".env.local")` itself, because the
drizzle-kit CLI does not read it the way Next.js does.

The Neon project also contains a `neondb` database holding an unrelated
expense app (`Person`, `Expense`). **Use `voltlabs`.** `neondb` only has
migration `0000` and will fail on today's code.

---

## 7. Orders

Flow: product page → `/checkout/[slug]` → `POST /api/orders` →
`/order/[id]`. Guest checkout, one product plus quantity. No cart.

**The single most important rule: amounts are computed server-side in
`lib/pricing.ts`, from the catalogue.** The browser sends a slug and a
quantity and nothing else. A client-supplied price is how a ₹799 lamp gets
bought for ₹1.

Other protections on that route:

- Zod validation, with errors keyed by **leaf field name** so the form can
  highlight the right input. `z.flattenError` only descends one level and
  lumped everything under `customer`/`address` — don't reach for it here.
- A honeypot field named `company`.
- Rate limiting by phone and hashed IP, counted **in the database**.
  In-memory counters are useless in serverless, where each invocation can be a
  fresh instance with an empty map.
- Online payment is refused with a clear message unless Razorpay is actually
  configured, so a half-configured deployment cannot strand someone mid-payment.

Both emails are best-effort. The order is already saved when they are sent, so
a mail outage must never turn a real order into an error page.

Order numbers are `VL-00001`, from a Postgres sequence. Deleting an order does
not reclaim its number.

---

## 8. Payments

### Cash on delivery — live

Order saved as `pending`. You call to confirm, dispatch, then set `paid` when
the cash is collected. `paid_at` records that, so COD revenue reports from the
same column online payments will use.

### UPI QR — live, deliberately manual

A **static** QR image at `public/upi-qr.png`, paying
**Codemagnet Solutions Private Limited** (the company behind the VoltLabs
brand). Checkout says so explicitly, because an unfamiliar payee name
mid-payment loses sales.

Being static, the QR carries **neither the amount nor an order number**. Two
consequences the code works around:

1. The amount is shown twice at checkout — in the instructions and large
   beneath the QR — because the customer types it themselves and a typo is
   silent.
2. There is no automatic confirmation. **You verify against the bank before
   dispatching.** The shop email and the admin row both tell you to look for
   the exact amount around the order timestamp.

We tried asking for the UTR at checkout and removed it: nobody has it to hand
at that moment, and it was friction on the screen that can least afford it.
Verification happens before dispatch either way, so it cost no safety. The
column and an optional API field remain if you want it back.

Anyone can click "I have paid" without paying. Verify-before-dispatch catches
it, so the exposure is your time, not stock. Recurring phantom UPI orders are
the signal to move this to Razorpay.

### Razorpay — built, switched off

Fully implemented and committed: order creation, HMAC signature verification
with constant-time compare, and an idempotent webhook. Not offered in the UI.
Set the keys and add an `online` option to `CheckoutForm` to enable it.

The design worth preserving: **the webhook is the source of truth, not the
browser callback.** People close the tab mid-payment. Both paths only promote
orders still `pending`, and the webhook deduplicates on Razorpay's event id
because it retries until it gets a 2xx.

---

## 9. Email

All mail goes over SMTP via `lib/mailer.ts`. `lib/email.ts` only decides what
each message says.

Three messages: shop order notification, customer order confirmation, contact
form enquiry. Replies to the shop notification reach the customer directly,
via `Reply-To`.

> **Gmail rewrites the `From` header** to whatever account authenticated,
> unless the address is verified under Settings → Accounts → "Send mail as".
> Only the display name is yours. Customers currently see
> `akhlesh011193@gmail.com` beneath "VoltLabs Orders".
>
> `SMTP_PASSWORD` must be a 16-character **app password**, which only exists
> once 2-Step Verification is on.

The domain's MX records point at **Zoho** (`mx.zoho.in`), not Gmail — that
mailbox is controlled by another director, which is why sending goes through
Gmail instead. If you ever switch, Zoho's India data centre needs
`smtp.zoho.in`, not `.com`.

SPF already authorises Zoho. **DKIM and DMARC are not set** on voltlabs.in.
That does not matter while sending from a Gmail address, but it does the
moment sending moves to the domain.

Web3Forms was removed entirely. The contact form used to post from the browser
to a third party with a public key, and nothing was ever stored. Messages are
now saved to `contact_messages` **before** the email is attempted, so an
enquiry cannot be lost to a mail outage.

Contact spam defences, replacing a captcha that the vendor's free tier never
enforced server-side: honeypot, a minimum time on the form, and a per-IP rate
limit in the database.

---

## 10. Admin panel

`/admin`, guarded by a single shared password exchanged for a signed,
http-only session cookie lasting 12 hours. Deliberately modest — a user table
and password reset flow would be thrown away when Cognito arrives. Everything
calls only `isAdminAuthenticated` and `requireAdmin`.

Day to day:

1. New order arrives by email and appears at the top of `/admin`.
2. UPI orders show **verify payment**. Match the amount and timestamp against
   the bank; set `paid`.
3. Call the customer to confirm. Expand the row for the address and a
   prefilled WhatsApp link.
4. Move the status along: `pending → confirmed → shipped → delivered`, and
   `paid` when money is in hand.

Database failures degrade rather than crash: the panel explains itself and
links to the health check; the status endpoint returns 503 with a message
rather than a bare 500 with an empty body.

---

## 11. Known limitations

- **Products are hardcoded** in `lib/products.ts`. Editing prices or stock
  means a code change and a deploy. This is the obvious next thing to move
  into the database.
- **`components/ProductsSection.tsx` keeps its own copy** of the product list.
  The two can drift. Worth collapsing into `lib/products.ts`.
- **No inventory tracking.** `inStock` is a boolean in a file; overselling is
  possible.
- **No customer accounts.** Guest checkout only; the order URL is an
  unguessable UUID and acts as the receipt link.
- **No cart** — one product plus quantity per order.
- **Images are heavy.** `og-image.png` is 2 MB, `smart-home-automation.png`
  1.9 MB. Worth optimising; it is a free speed win on mobile data.
- **Homepage social icons are `href="#"` placeholders.**
- The refund policy still has a section about Amazon purchases, kept for
  customers who bought there before. All Amazon *links* are gone.

---

## 12. Where this is heading

The plan is to move hosting onto AWS and grow into a full store — customer
accounts, admin product management, payments. Recommended shape:

- **Amplify Hosting** for the app (or App Runner/Fargate if Amplify's
  constraints bite — the app is plain Next.js and containerises trivially)
- **Aurora Serverless v2 Postgres via the Data API** — HTTP, so Lambda's
  no-VPC problem disappears rather than being worked around
- **Cognito** for auth, **S3 + CloudFront** for product media, **SES** for
  email, **Secrets Manager** for keys

Verify before committing: Amplify's support for the Next.js major in use, and
Aurora Serverless v2's minimum capacity pricing in your region. Both could
change the recommendation.

The codebase is already portable. Keep it that way.

---

## 13. Traps, in one place

Every one of these was hit for real.

1. **Vercel env changes need a redeploy.** They are injected at build time.
2. **Connect to the database lazily**, or `next build` fails without
   `DATABASE_URL`.
3. **drizzle-kit does not read `.env.local`** — `drizzle.config.ts` loads it.
4. **`z.flattenError` only descends one level.** Build field errors from
   `error.issues` instead.
5. **Gmail rewrites `From`** unless the address is verified.
6. **Zoho India needs `smtp.zoho.in`**, not `.com`.
7. **Postgres enums are append-only.**
8. **The UPI QR must stay on a white plate** in dark mode.
9. **Unlayered CSS beats Tailwind's layered `:hover`.** Restate hovers in
   `globals.css` when you override a base utility there.
10. **Match the Vercel function region to the Neon region.** Currently both
    Singapore.
11. **Neon free tier suspends after idle.** The first request is ~800 ms, the
    rest 38–75 ms. A slow first checkout is not a bug.
12. **Use the Neon `voltlabs` database**, not `neondb`.

---

## 14. Conventions

- Comments explain **why**, not what. Prefer a short paragraph above something
  subtle over a line-by-line narration.
- Customer-facing copy says what happened and what to do next. No apologies,
  no raw validator text — every Zod message is written for a human.
- Run `npm run lint` and `npm run build` before committing; the build
  typechecks.
- Commit messages explain the reasoning, not just the change.
- Never commit `.env.local`. Never print a secret into a terminal, a log, or a
  chat transcript — `lib/logger.ts` redacts common credential keys
  automatically.
