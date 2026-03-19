"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#products", label: "Products" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="VoltLabs" width={50} height={50} />
            
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Shop Now Button - Hidden on mobile, shown on tablet+ */}
            <a 
              href="https://www.amazon.in/stores/VoltLabs/page/417214B6-FD85-46C7-89D4-401DFC5C7732?lp_asin=B0FXVM966H&ref_=cm_sw_r_ud_ast_store_1G952ME5NPWS3TQPS3YH"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block bg-[#EAA832] hover:bg-[#D4922A] text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[#EAA832]/30"
            >
              Shop Now
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:text-[#EAA832] hover:bg-[#EAA832]/5 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <a 
                href="https://www.amazon.in/stores/VoltLabs/page/417214B6-FD85-46C7-89D4-401DFC5C7732?lp_asin=B0FXVM966H&ref_=cm_sw_r_ud_ast_store_1G952ME5NPWS3TQPS3YH"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-[#EAA832] hover:bg-[#D4922A] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                Shop Now on Amazon
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
