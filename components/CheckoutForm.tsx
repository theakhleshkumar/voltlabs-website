"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { MAX_QUANTITY_PER_ITEM, SHIPPING_PAISE, formatInr, toPaise } from "@/lib/pricing";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

type FieldErrors = Record<string, string[] | undefined>;

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all";

const FieldError = ({ messages }: { messages?: string[] }) =>
  messages?.length ? (
    <p className="text-sm text-red-600 mt-1.5">{messages[0]}</p>
  ) : null;

const CheckoutForm = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "placing">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const unitPricePaise = toPaise(product.price);
  const subtotalPaise = unitPricePaise * quantity;
  const totalPaise = subtotalPaise + SHIPPING_PAISE;

  const quantityOptions = useMemo(
    () => Array.from({ length: MAX_QUANTITY_PER_ITEM }, (_, i) => i + 1),
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("placing");
    setFormError(null);
    setFieldErrors({});

    const data = new FormData(event.currentTarget);
    const payload = {
      items: [{ slug: product.slug, quantity }],
      paymentMethod: "cod" as const,
      customer: {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
      },
      address: {
        line1: String(data.get("line1") ?? ""),
        line2: String(data.get("line2") ?? ""),
        city: String(data.get("city") ?? ""),
        state: String(data.get("state") ?? ""),
        pincode: String(data.get("pincode") ?? ""),
      },
      notes: String(data.get("notes") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        // Already keyed by input name ("phone", "pincode") by the API.
        if (result.fields) setFieldErrors(result.fields as FieldErrors);
        setStatus("idle");
        return;
      }

      router.push(`/order/${result.orderId}`);
    } catch {
      setFormError("We could not reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Your details</h2>

          <div>
            <label htmlFor="name" className={labelClass}>Full name</label>
            <input id="name" name="name" required autoComplete="name" className={inputClass} placeholder="Your full name" />
            <FieldError messages={fieldErrors.name} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className={labelClass}>Mobile number</label>
              <input
                id="phone" name="phone" required inputMode="numeric" autoComplete="tel"
                className={inputClass} placeholder="10-digit mobile number"
              />
              <FieldError messages={fieldErrors.phone} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                className={inputClass} placeholder="you@example.com"
              />
              <FieldError messages={fieldErrors.email} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Delivery address</h2>

          <div>
            <label htmlFor="line1" className={labelClass}>Address</label>
            <input
              id="line1" name="line1" required autoComplete="address-line1"
              className={inputClass} placeholder="House / flat number, street"
            />
            <FieldError messages={fieldErrors.line1} />
          </div>

          <div>
            <label htmlFor="line2" className={labelClass}>
              Area, landmark <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input id="line2" name="line2" autoComplete="address-line2" className={inputClass} placeholder="Locality, nearby landmark" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="city" className={labelClass}>City</label>
              <input id="city" name="city" required autoComplete="address-level2" className={inputClass} placeholder="City" />
              <FieldError messages={fieldErrors.city} />
            </div>
            <div>
              <label htmlFor="pincode" className={labelClass}>PIN code</label>
              <input
                id="pincode" name="pincode" required inputMode="numeric" maxLength={6}
                autoComplete="postal-code" className={inputClass} placeholder="6-digit PIN code"
              />
              <FieldError messages={fieldErrors.pincode} />
            </div>
          </div>

          <div>
            <label htmlFor="state" className={labelClass}>State</label>
            <select id="state" name="state" required defaultValue="" autoComplete="address-level1" className={inputClass}>
              <option value="" disabled>Select your state</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <FieldError messages={fieldErrors.state} />
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>
              Delivery instructions <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea id="notes" name="notes" rows={2} className={`${inputClass} resize-none`} placeholder="Anything our delivery partner should know" />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment</h2>
          <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-[#EAA832] bg-[#EAA832]/5">
            <svg className="w-6 h-6 shrink-0 text-[#EAA832] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Cash on Delivery</p>
              <p className="text-sm text-gray-600 mt-0.5">
                Pay {formatInr(totalPaise)} in cash when your order arrives. We will call to
                confirm before dispatch.
              </p>
            </div>
          </div>
        </section>

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {formError && (
          <p role="alert" className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "placing"}
          className="w-full bg-[#EAA832] hover:bg-[#D4922A] disabled:bg-[#EAA832]/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#EAA832]/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          {status === "placing" ? "Placing your order..." : `Place order · ${formatInr(totalPaise)}`}
        </button>

        <p className="text-sm text-gray-500 text-center">
          By placing this order you agree to our{" "}
          <a href="/terms-of-service" className="text-[#EAA832] hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="/refund-policy" className="text-[#EAA832] hover:underline">Refund Policy</a>.
        </p>
      </form>

      <aside className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Order summary</h2>

        <div className="flex gap-4">
          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50" data-theme-fixed>
            <Image src={product.images[0]} alt={product.name} fill className="object-contain p-1.5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 leading-snug">{product.name}</p>
            <p className="text-sm text-gray-600 mt-1">{formatInr(unitPricePaise)} each</p>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="quantity" className={labelClass}>Quantity</label>
          <select
            id="quantity" value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className={inputClass}
          >
            {quantityOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <dl className="mt-6 pt-5 border-t border-gray-200 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="text-gray-900 font-medium">{formatInr(subtotalPaise)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd className="text-green-600 font-medium">
              {SHIPPING_PAISE === 0 ? "Free" : formatInr(SHIPPING_PAISE)}
            </dd>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200 text-base">
            <dt className="font-bold text-gray-900">Total</dt>
            <dd className="font-bold text-gray-900">{formatInr(totalPaise)}</dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-2.5 text-sm text-gray-600">
          {["1 year warranty", "7-day easy returns", "Free delivery across India"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CheckoutForm;
