import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VoltLabs Privacy Policy - Learn how we collect, use, and protect your personal information. GDPR & CCPA compliant.",
  alternates: {
    canonical: "https://voltlabs.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | VoltLabs",
    description: "Learn how VoltLabs collects, uses, and protects your personal information.",
    url: "https://voltlabs.in/privacy-policy",
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
          <Link href="/privacy-policy" className="text-[#EAA832] text-sm">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500">Last Updated: March 13, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                VoltLabs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, purchase our IoT hardware products, use our mobile applications, or interact with our connected devices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing our services, purchasing our products, or using our applications, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access our services or purchase our products.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">We may collect personally identifiable information, including but not limited to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (credit card numbers, billing details)</li>
                <li>Account credentials (username, password)</li>
                <li>Government-issued identification (for warranty and compliance purposes)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Device and Technical Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">When you use our IoT devices and applications, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Device identifiers (serial numbers, MAC addresses, IMEI)</li>
                <li>IP address and geolocation data</li>
                <li>Device status, configuration, and diagnostic data</li>
                <li>Sensor data (temperature, humidity, motion, etc.)</li>
                <li>Usage patterns and interaction logs</li>
                <li>Firmware version and update history</li>
                <li>Network information (Wi-Fi SSID, signal strength)</li>
                <li>Mobile device information (OS version, app version)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Transaction Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">For purchases and orders, we collect:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Purchase history and order details</li>
                <li>Warranty registration information</li>
                <li>Return and refund records</li>
                <li>Customer support interactions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Information from Third Parties</h3>
              <p className="text-gray-600 leading-relaxed">
                We may receive information from third-party services you connect with our products (e.g., smart home platforms, voice assistants), payment processors, shipping carriers, and marketing partners.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Product Delivery:</strong> To process orders, ship products, and manage deliveries</li>
                <li><strong>Device Functionality:</strong> To enable and optimize the performance of our IoT devices</li>
                <li><strong>Customer Support:</strong> To respond to inquiries, troubleshoot issues, and provide technical assistance</li>
                <li><strong>Account Management:</strong> To create and manage your user account</li>
                <li><strong>Firmware Updates:</strong> To deliver over-the-air (OTA) updates and security patches</li>
                <li><strong>Product Improvement:</strong> To analyze usage patterns and improve our products and services</li>
                <li><strong>Communication:</strong> To send order confirmations, shipping updates, and important notices</li>
                <li><strong>Marketing:</strong> To send promotional materials (with your consent)</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                <li><strong>Safety and Security:</strong> To detect, prevent, and address fraud, security issues, and technical problems</li>
                <li><strong>Warranty Services:</strong> To process warranty claims and provide repair/replacement services</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We share information with trusted third-party service providers who assist us in operating our business, including payment processors, shipping carriers, cloud hosting providers, customer support platforms, and analytics services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Business Partners</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                With your consent, we may share information with smart home platform providers (Google Home, Amazon Alexa, Apple HomeKit) to enable device integrations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Legal Requirements</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may disclose information when required by law, court order, or government regulation, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Business Transfers</h3>
              <p className="text-gray-600 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any change in ownership or use of your personal information.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>End-to-end encryption for sensitive device communications</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security audits and penetration testing</li>
                <li>Employee training on data protection practices</li>
                <li>Secure firmware signing and verification</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Specifically:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Account Data:</strong> Retained until you delete your account</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years for tax and legal compliance</li>
                <li><strong>Device Data:</strong> Retained while the device is registered to your account</li>
                <li><strong>Support Tickets:</strong> Retained for 3 years after resolution</li>
                <li><strong>Marketing Preferences:</strong> Retained until you unsubscribe</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Access and Portability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to request a copy of the personal information we hold about you in a structured, commonly used, and machine-readable format.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Correction</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to request correction of inaccurate or incomplete personal information.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Deletion</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to request deletion of your personal information, subject to certain legal exceptions (e.g., tax records, warranty obligations).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.4 Opt-Out</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may opt out of marketing communications at any time by clicking the &quot;unsubscribe&quot; link in our emails or contacting us directly.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.5 Data Processing Restriction</h3>
              <p className="text-gray-600 leading-relaxed">
                You may request that we limit the processing of your personal information in certain circumstances.
              </p>
            </section>

            {/* GDPR Compliance */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. GDPR Compliance (European Users)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
                <li>Right to object to processing based on legitimate interests</li>
                <li>Right not to be subject to automated decision-making</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our legal basis for processing includes: contract performance, legitimate interests, legal obligations, and consent.
              </p>
            </section>

            {/* CCPA Compliance */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. CCPA Compliance (California Residents)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                California residents have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Right to know what personal information is collected and how it is used</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                <strong>We do not sell your personal information.</strong> To exercise your CCPA rights, contact us at care@voltlabs.in.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our products and services are not intended for children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately at care@voltlabs.in, and we will take steps to delete such information.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This policy is compliant with the Children&apos;s Online Privacy Protection Act (COPPA) and similar international regulations.
              </p>
            </section>

            {/* Google Play Store Compliance */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Mobile Application Privacy (Google Play & App Store)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mobile applications, available on Google Play Store and Apple App Store, adhere to the following practices:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">11.1 Permissions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Our apps may request the following permissions:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li><strong>Location:</strong> To detect nearby IoT devices and enable location-based features</li>
                <li><strong>Bluetooth:</strong> To connect with and configure IoT devices</li>
                <li><strong>Camera:</strong> To scan QR codes for device setup</li>
                <li><strong>Storage:</strong> To save device configurations and logs</li>
                <li><strong>Notifications:</strong> To send alerts and device status updates</li>
                <li><strong>Network:</strong> To communicate with devices and cloud services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">11.2 Data Collection in Apps</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our apps collect data as described in Section 2 of this policy. You can manage app permissions through your device settings at any time.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">11.3 Third-Party SDKs</h3>
              <p className="text-gray-600 leading-relaxed">
                Our apps may include third-party SDKs for analytics, crash reporting, and functionality. These include Firebase, Google Analytics, and Crashlytics. Each operates under their respective privacy policies.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our website uses cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission, for transfers to countries without adequate data protection laws.
              </p>
            </section>

            {/* Product Safety */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Product Safety and Compliance</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As an electronics manufacturer, we are committed to product safety and regulatory compliance:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All products meet FCC, CE, and UL safety standards</li>
                <li>We may collect device data to identify safety issues and initiate recalls if necessary</li>
                <li>Firmware updates may be deployed automatically to address safety concerns</li>
                <li>We maintain records as required by consumer product safety regulations</li>
              </ul>
            </section>

            {/* Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new &quot;Last Updated&quot; date. For significant changes, we may also send you an email notification. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-700 mb-2"><strong>VoltLabs Privacy Team</strong></p>
                <p className="text-gray-600">Email: care@voltlabs.in</p>
                <p className="text-gray-600">Phone: +91 8178902630</p>
                <p className="text-gray-600">Address: KH NO 242 Ground Floor, Naya Lal Dora Bans, Near SDM Office, New Delhi, North West Delhi, Delhi - 110081</p>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                For data protection inquiries in the EU, you may also contact our Data Protection Officer at care@voltlabs.in.
              </p>
            </section>

            {/* Acknowledgment */}
            <section className="mb-10 bg-[#EAA832]/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment</h2>
              <p className="text-gray-600 leading-relaxed">
                By using our website, purchasing our products, or using our applications, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
