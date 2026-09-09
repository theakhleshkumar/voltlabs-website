import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "VoltLabs shipping and delivery policy - free shipping across India, dispatch and delivery timelines, cash on delivery, and tracking.",
  alternates: {
    canonical: "https://voltlabs.in/shipping-policy",
  },
  openGraph: {
    title: "Shipping & Delivery Policy | VoltLabs",
    description:
      "Free shipping across India, dispatch and delivery timelines, cash on delivery and tracking.",
    url: "https://voltlabs.in/shipping-policy",
    type: "website",
  },
};

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Section = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h2>
    <div className="text-gray-600 leading-relaxed space-y-4">{children}</div>
  </section>
);

export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-gray-500">Last Updated: September 9, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <Section heading="1. Where we deliver">
              <p>
                We deliver to all serviceable PIN codes across India. If our courier partner does
                not service your PIN code, we will contact you on the number you provided and
                arrange an alternative or refund your order in full.
              </p>
              <p>We do not currently ship outside India.</p>
            </Section>

            <Section heading="2. Shipping charges">
              <p>
                Shipping is <strong>free on all orders</strong> across India. The price you see at
                checkout is the price you pay, with no delivery charge added.
              </p>
            </Section>

            <Section heading="3. Order confirmation">
              <p>
                For cash on delivery orders we call you on the mobile number provided to confirm
                your order before we dispatch it. This protects you from mistaken orders and helps
                us avoid failed deliveries.
              </p>
              <p>
                If we cannot reach you after reasonable attempts within 3 working days, we may
                cancel the order. You are welcome to place it again at any time.
              </p>
            </Section>

            <Section heading="4. Dispatch and delivery timelines">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dispatch:</strong> within 1 to 2 working days of order confirmation.
                </li>
                <li>
                  <strong>Metro cities:</strong> typically 3 to 5 working days from dispatch.
                </li>
                <li>
                  <strong>Other cities and towns:</strong> typically 5 to 8 working days from
                  dispatch.
                </li>
                <li>
                  <strong>Remote areas:</strong> may take up to 10 working days from dispatch.
                </li>
              </ul>
              <p>
                Working days exclude Sundays and public holidays. These are estimates, not
                guarantees: weather, regional restrictions and courier backlogs can extend them.
              </p>
            </Section>

            <Section heading="5. Tracking your order">
              <p>
                Once your order is dispatched we will share tracking details on the mobile number
                and email address you provided. You can also message us on WhatsApp at
                +91 8178902630 with your order number for an update at any time.
              </p>
            </Section>

            <Section heading="6. Cash on delivery">
              <p>
                Cash on delivery is available on all orders. Please keep the exact order amount
                ready, as our delivery partners may not carry change.
              </p>
              <p>
                Repeatedly refusing cash on delivery shipments may result in the option being
                withdrawn for future orders from that address or phone number.
              </p>
            </Section>

            <Section heading="7. Delivery attempts and failed deliveries">
              <p>
                Our courier partners make up to 3 delivery attempts. If all attempts fail, or the
                address is found to be incorrect or unreachable, the shipment returns to us.
              </p>
              <p>
                For prepaid orders returned this way, we refund the full amount once the parcel
                reaches us, following our{" "}
                <Link href="/refund-policy" className="text-[#EAA832] hover:underline">
                  Refund Policy
                </Link>
                .
              </p>
            </Section>

            <Section heading="8. Checking your parcel">
              <p>
                Please check the packaging before accepting delivery. If the parcel appears opened,
                damaged or tampered with, refuse it and contact us the same day at
                support@voltlabs.in or on WhatsApp so we can send a replacement.
              </p>
            </Section>

            <Section heading="9. Incorrect address">
              <p>
                Please check your address and PIN code carefully at checkout. If you notice a
                mistake, contact us immediately with your order number. Once an order has been
                dispatched we may not be able to change its destination.
              </p>
            </Section>

            <Section heading="10. Contact us">
              <p>
                Questions about a delivery? Email{" "}
                <a href="mailto:support@voltlabs.in" className="text-[#EAA832] hover:underline">
                  support@voltlabs.in
                </a>{" "}
                or message us on WhatsApp at{" "}
                <a href="tel:+918178902630" className="text-[#EAA832] hover:underline">
                  +91 8178902630
                </a>
                . We reply on working days, usually within one business day.
              </p>
            </Section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
