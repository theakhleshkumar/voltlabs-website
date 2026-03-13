import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | VoltLabs",
  description: "VoltLabs Terms of Service - Terms and conditions for using our website, products, and services.",
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
          <Link href="/terms-of-service" className="text-[#EAA832] text-sm">Terms of Service</Link>
          <Link href="/refund-policy" className="text-gray-500 hover:text-gray-400 text-sm">Refund Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-500">Last Updated: March 13, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to VoltLabs! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the VoltLabs website (www.voltlabs.in), mobile applications, IoT devices, and related services (collectively, the &quot;Services&quot;).
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing our website, purchasing our products, downloading our apps, or using our IoT devices, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. Your continued use of the Services after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>&quot;VoltLabs,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;</strong> refers to VoltLabs, a smart home IoT company based in New Delhi, India.</li>
                <li><strong>&quot;User,&quot; &quot;you,&quot; &quot;your&quot;</strong> refers to any individual or entity accessing or using our Services.</li>
                <li><strong>&quot;Products&quot;</strong> refers to all IoT hardware devices manufactured and sold by VoltLabs, including smart lamps, smart switches, and related accessories.</li>
                <li><strong>&quot;App&quot;</strong> refers to the VoltLabs mobile application available on Android and iOS platforms.</li>
                <li><strong>&quot;Content&quot;</strong> refers to all text, images, videos, and other materials on our website and apps.</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features of our Services, you may need to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Keep your password secure and confidential</li>
                <li>Be responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Eligibility</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You must be at least 18 years old to create an account and use our Services. By creating an account, you represent that you meet this age requirement.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Account Termination</h3>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for any reason, including violation of these Terms, fraudulent activity, or extended inactivity.
              </p>
            </section>

            {/* Products and Orders */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Products and Orders</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Product Descriptions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions are accurate, complete, or error-free. Colors may vary due to monitor settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Pricing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change prices at any time without notice. However, price changes will not affect orders that have already been confirmed.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Order Acceptance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your order is an offer to purchase. We reserve the right to accept or decline your order for any reason, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Product unavailability</li>
                <li>Pricing errors</li>
                <li>Suspected fraudulent activity</li>
                <li>Payment issues</li>
                <li>Shipping restrictions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Payment</h3>
              <p className="text-gray-600 leading-relaxed">
                We accept various payment methods including credit cards, debit cards, UPI, net banking, and Cash on Delivery (COD) for eligible orders. Payment must be received before products are shipped (except for COD orders).
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Shipping Areas</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We currently ship to all serviceable pin codes within India. Certain remote areas may have limited delivery options or additional charges.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Delivery Times</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Estimated delivery times are provided at checkout. While we strive to meet these estimates, delivery times are not guaranteed and may vary due to factors beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Risk of Loss</h3>
              <p className="text-gray-600 leading-relaxed">
                Risk of loss and title for products pass to you upon delivery to the shipping carrier. We are not responsible for lost, stolen, or damaged packages once handed over to the carrier.
              </p>
            </section>

            {/* Product Use and Restrictions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Product Use and Restrictions</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Intended Use</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                VoltLabs products are designed for residential and light commercial use only. Products must be used in accordance with the user manual and safety guidelines provided.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Prohibited Uses</h3>
              <p className="text-gray-600 leading-relaxed mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Modify, disassemble, or reverse engineer our products</li>
                <li>Use products for any illegal or unauthorized purpose</li>
                <li>Bypass any security features or access controls</li>
                <li>Interfere with or disrupt our servers or networks</li>
                <li>Use products in hazardous environments not specified for use</li>
                <li>Resell or redistribute products without authorization</li>
                <li>Remove or alter any product labels or markings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Firmware Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Our products may receive automatic firmware updates to improve functionality, security, and performance. By using our products, you consent to receiving these updates.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Our Rights</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content, trademarks, logos, designs, software, firmware, and other intellectual property on our website, apps, and products are owned by VoltLabs or our licensors. These are protected by copyright, trademark, patent, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Limited License</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable license to use our apps and firmware solely in connection with VoltLabs products for personal, non-commercial purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Restrictions</h3>
              <p className="text-gray-600 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to extract the source code.
              </p>
            </section>

            {/* Warranty */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranty</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Limited Warranty</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                VoltLabs products come with a 1-year manufacturer warranty from the date of purchase. This warranty covers defects in materials and workmanship under normal use conditions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Warranty Exclusions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">This warranty does NOT cover:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Damage from misuse, abuse, or negligence</li>
                <li>Damage from unauthorized modifications or repairs</li>
                <li>Damage from power surges, lightning, or electrical issues</li>
                <li>Normal wear and tear</li>
                <li>Cosmetic damage (scratches, dents)</li>
                <li>Damage from exposure to water, fire, or extreme conditions</li>
                <li>Products with removed or altered serial numbers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">8.3 Warranty Claims</h3>
              <p className="text-gray-600 leading-relaxed">
                To make a warranty claim, contact our support team at care@voltlabs.in with your proof of purchase. Valid claims will be resolved through repair or replacement at our discretion.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Disclaimer</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VOLTLABS PROVIDES SERVICES &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">9.2 Liability Cap</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                IN NO EVENT SHALL VOLTLABS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OUR SERVICES.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">9.3 Maximum Liability</h3>
              <p className="text-gray-600 leading-relaxed">
                Our total liability for any claim arising from these Terms or your use of our Services shall not exceed the amount you paid for the specific product or service giving rise to the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless VoltLabs, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Services may integrate with third-party services such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Amazon Alexa</li>
                <li>Google Home / Google Assistant</li>
                <li>Apple HomeKit</li>
                <li>Payment processors</li>
                <li>Shipping carriers</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Your use of third-party services is subject to their respective terms and privacy policies. We are not responsible for the availability, content, or practices of third-party services.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">12.1 Governing Law</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">12.2 Jurisdiction</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">12.3 Informal Resolution</h3>
              <p className="text-gray-600 leading-relaxed">
                Before filing any formal dispute, you agree to contact us at care@voltlabs.in to attempt to resolve the matter informally within 30 days.
              </p>
            </section>

            {/* General Provisions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">13.1 Entire Agreement</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and VoltLabs regarding the Services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">13.2 Severability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">13.3 Waiver</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">13.4 Assignment</h3>
              <p className="text-gray-600 leading-relaxed">
                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-700 mb-2"><strong>VoltLabs</strong></p>
                <p className="text-gray-600">Email: care@voltlabs.in</p>
                <p className="text-gray-600">Phone: +91 8178902630</p>
                <p className="text-gray-600">WhatsApp: +91 8178902630</p>
                <p className="text-gray-600">Address: KH NO 242 Ground Floor, Naya Lal Dora Bans, Near SDM Office, New Delhi, North West Delhi, Delhi - 110081</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-10 bg-[#EAA832]/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment</h2>
              <p className="text-gray-600 leading-relaxed">
                By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please discontinue use of our Services immediately.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
