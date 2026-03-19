import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "VoltLabs Refund Policy - Easy returns within 7 days, hassle-free refunds, and exchange policies for smart home products.",
  alternates: {
    canonical: "https://voltlabs.in/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | VoltLabs",
    description: "Easy returns within 7 days, hassle-free refunds, and exchange policies.",
    url: "https://voltlabs.in/refund-policy",
    type: "website",
  },
};

// Navigation Component
const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
        </Link>
        <Link 
          href="/"
          className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  </nav>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="VoltLabs" width={32} height={32} className="w-8 h-8" />
          <span className="text-gray-400">© 2026 VoltLabs. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</Link>
          <Link href="/refund-policy" className="text-[#EAA832] text-sm">Refund Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Refund Policy</h1>
            <p className="text-gray-500">Last Updated: March 13, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At VoltLabs, we are committed to ensuring your complete satisfaction with our smart home IoT products. We understand that sometimes a product may not meet your expectations or may arrive damaged. This Refund Policy explains your rights regarding returns, exchanges, and refunds.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Please read this policy carefully before making a purchase. By placing an order on our website or through authorized sellers, you agree to the terms outlined in this policy.
              </p>
            </section>

            {/* Return Window */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Return Window</h2>
              
              <div className="bg-[#EAA832]/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">7-Day Return Policy</h3>
                <p className="text-gray-600 leading-relaxed">
                  You may return most new, unopened items sold by VoltLabs within <strong>7 days of delivery</strong> for a full refund. Items must be in their original condition with all packaging, accessories, and documentation included.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Important Deadlines</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Return Request:</strong> Must be initiated within 7 days of delivery</li>
                <li><strong>Product Return:</strong> Must be shipped within 5 days of return approval</li>
                <li><strong>Damaged/Defective Items:</strong> Must be reported within 48 hours of delivery</li>
                <li><strong>Wrong Product:</strong> Must be reported within 48 hours of delivery</li>
              </ul>
            </section>

            {/* Return Eligibility */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Return Eligibility</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Eligible for Return</h3>
              <p className="text-gray-600 leading-relaxed mb-4">The following items are eligible for return:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Unopened products in original sealed packaging</li>
                <li>Products with manufacturing defects</li>
                <li>Wrong product delivered</li>
                <li>Products damaged during shipping (must be reported within 48 hours)</li>
                <li>Products not matching the description on the website</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Return Conditions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">For a return to be accepted:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Product must be in original condition (unused, undamaged)</li>
                <li>All original packaging must be intact</li>
                <li>All accessories, manuals, and documentation must be included</li>
                <li>Original invoice/receipt must be provided</li>
                <li>All product seals must be unbroken (for unopened items)</li>
              </ul>
            </section>

            {/* Non-Returnable Items */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Returnable Items</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The following items cannot be returned or refunded:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Products that have been installed, used, or activated</li>
                <li>Products with broken or missing seals</li>
                <li>Products with damage caused by misuse, negligence, or accidents</li>
                <li>Products returned after the 7-day return window</li>
                <li>Products without original packaging or accessories</li>
                <li>Products purchased from unauthorized sellers</li>
                <li>Customized or personalized products</li>
                <li>Products with removed or altered serial numbers</li>
                <li>Clearance or final sale items (marked as non-returnable at purchase)</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Process</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 How to Request a Refund</h3>
              <p className="text-gray-600 leading-relaxed mb-4">To initiate a return/refund:</p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
                <li><strong>Contact Us:</strong> Send an email to care@voltlabs.in with your order number, product details, and reason for return.</li>
                <li><strong>Receive Approval:</strong> Our team will review your request and respond within 24-48 hours with return instructions.</li>
                <li><strong>Pack the Product:</strong> Safely pack the product in its original packaging with all accessories.</li>
                <li><strong>Ship the Product:</strong> Ship the product to our designated address (provided in approval email).</li>
                <li><strong>Quality Check:</strong> Once received, we will inspect the product within 3-5 business days.</li>
                <li><strong>Receive Refund:</strong> Upon approval, your refund will be processed.</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Refund Timeline</h3>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <table className="w-full text-gray-600">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 font-medium">Original Payment Method</td>
                      <td className="py-3 text-right">5-7 business days</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 font-medium">Bank Transfer</td>
                      <td className="py-3 text-right">5-7 business days</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 font-medium">Credit/Debit Card</td>
                      <td className="py-3 text-right">5-10 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">UPI</td>
                      <td className="py-3 text-right">3-5 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-sm">
                *Refund timelines may vary depending on your bank or payment provider.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.3 Refund Amount</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Full Refund:</strong> Product price will be fully refunded for eligible returns</li>
                <li><strong>Shipping Charges:</strong> Original shipping charges are non-refundable unless the return is due to our error (wrong product, defective item)</li>
                <li><strong>Return Shipping:</strong> Customer bears return shipping costs unless the return is due to our error</li>
              </ul>
            </section>

            {/* Exchange Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Exchange Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer exchanges for products within the 7-day return window. Exchanges are subject to availability.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Eligible Exchanges</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Different color variant (same model)</li>
                <li>Different model (price difference will be adjusted)</li>
                <li>Replacement for defective products</li>
                <li>Wrong size/specification received</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Exchange Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Contact care@voltlabs.in with your exchange request. If the new product costs more, you&apos;ll need to pay the difference. If it costs less, the difference will be refunded.
              </p>
            </section>

            {/* Damaged or Defective Products */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Damaged or Defective Products</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Damaged During Shipping</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If your product arrives damaged:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Do NOT accept the delivery if the outer packaging is visibly damaged</li>
                <li>If damage is discovered after opening, report within 48 hours</li>
                <li>Take photos of the damage, packaging, and shipping label</li>
                <li>Email photos and order details to care@voltlabs.in</li>
                <li>We will arrange a free replacement or full refund</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Manufacturing Defects</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If your product has a manufacturing defect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Within 7 days:</strong> Full refund or free replacement</li>
                <li><strong>Within warranty period (1 year):</strong> Free repair or replacement</li>
                <li>Contact our support team with product photos and description of the defect</li>
              </ul>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cancellation Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Before Shipping</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may cancel your order at any time before it has been shipped:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Full refund will be processed to original payment method</li>
                <li>Cancellation can be requested via email to care@voltlabs.in</li>
                <li>Please include your order number in the cancellation request</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 After Shipping</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Once your order has been shipped, it cannot be cancelled. However, you may:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Refuse delivery (product will be returned to us)</li>
                <li>Request a return after delivery under our 7-day return policy</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                <strong>Note:</strong> For refused deliveries, return shipping charges may be deducted from the refund amount.
              </p>
            </section>

            {/* Amazon Purchases */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Purchases from Amazon</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For VoltLabs products purchased through Amazon.in:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Returns and refunds are governed by Amazon&apos;s return policy</li>
                <li>Please initiate returns through your Amazon account</li>
                <li>Amazon&apos;s return window and conditions apply</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                For warranty-related issues on Amazon purchases, you may contact us directly at care@voltlabs.in with your Amazon order ID.
              </p>
            </section>

            {/* Disputes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Refund Disputes</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you disagree with our refund decision:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Email care@voltlabs.in with your concerns and supporting documentation</li>
                <li>Our senior team will review within 5 business days</li>
                <li>Final decision will be communicated via email</li>
                <li>If unresolved, disputes are subject to the jurisdiction of courts in New Delhi, India</li>
              </ol>
            </section>

            {/* Contact Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For any questions about returns, refunds, or exchanges, please reach out to our customer support team:
              </p>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-700 mb-2"><strong>VoltLabs Customer Support</strong></p>
                <p className="text-gray-600">Email: care@voltlabs.in</p>
                <p className="text-gray-600">Phone: +91 8178902630</p>
                <p className="text-gray-600">WhatsApp: +91 8178902630</p>
                <p className="text-gray-600 mt-3"><strong>Business Hours:</strong></p>
                <p className="text-gray-600">Monday - Saturday: 10:00 AM - 6:00 PM IST</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </section>

            {/* Policy Changes */}
            <section className="mb-10 bg-[#EAA832]/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                VoltLabs reserves the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically. Continued use of our Services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
