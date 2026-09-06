import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/918178902630?text=Hi%20VoltLabs!%20I%20have%20a%20question%20about%20your%20products.";

const Footer = () => (
  <footer data-theme-fixed className="bg-gray-900 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="VoltLabs" width={50} height={50} />
          </div>
          <p className="text-gray-400 leading-relaxed">
            Making smart homes accessible to everyone. Premium quality smart lighting at honest prices.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-sm text-gray-400">Chat with us on WhatsApp</span>
          </a>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Products</h4>
          <ul className="space-y-4">
            {["RGB Touch Lamp", "Table Touch Lamp", "Spiral Table Lamp", "Coming Soon"].map((item) => (
              <li key={item}>
                <a href="#products" className="text-gray-400 hover:text-[#EAA832] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4">
            <li>
              <a href="#faq" className="text-gray-400 hover:text-[#EAA832] transition-colors">FAQ</a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-[#EAA832] transition-colors">Contact Us</a>
            </li>
            <li>
              <Link href="/refund-policy" className="text-gray-400 hover:text-[#EAA832] transition-colors">Refund Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-[#EAA832] transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#EAA832] transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-sm text-gray-500">Email us at</div>
                <a href="mailto:support@voltlabs.in" className="text-gray-400 hover:text-[#EAA832] transition-colors break-all">
                  support@voltlabs.in
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <div className="text-sm text-gray-500">Call or WhatsApp</div>
                <a href="tel:+918178902630" className="text-gray-400 hover:text-[#EAA832] transition-colors">
                  +91 8178902630
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="text-sm text-gray-500">Office Address</div>
                <address className="text-gray-400 text-sm not-italic leading-relaxed">
                  Barrod, Barrod Sub Post Office, Kankara Barrod, Barrod,
                  <br />
                  Kotputli-Behror - 301020 India (IN)
                </address>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © 2026 VoltLabs. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</Link>
          <Link href="/refund-policy" className="text-gray-500 hover:text-gray-400 text-sm">Refund Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
