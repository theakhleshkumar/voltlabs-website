"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Navigation Component
const Navigation = () => {
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
            <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900">VoltLabs</span>
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

// Hero Section
const HeroSection = () => (
  <section className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    {/* Ambient Light Effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EAA832]/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px]" />
    <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px]" />
    
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-[#EAA832] rounded-full animate-pulse" />
            <span className="text-white/80 font-medium text-sm">Smart Living, Simplified</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
            Transform Your Home with
            <span className="text-[#EAA832]"> Smart IoT</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
            Experience the future of connected living with VoltLabs smart IoT products. 
            Control your home devices from anywhere using our app, voice commands, or simple touch..
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#products"
              className="inline-flex items-center justify-center gap-2 bg-[#EAA832] hover:bg-[#D4922A] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-[#EAA832]/30 hover:-translate-y-1"
            >
              Explore Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="#features"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#EAA832] text-white hover:text-[#EAA832] px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Learn More
            </a>
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">WiFi</div>
              <div className="text-gray-400 text-sm">Connected</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1 Year</div>
              <div className="text-gray-400 text-sm">Warranty</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">App</div>
              <div className="text-gray-400 text-sm">Controlled</div>
            </div>
          </div>
        </div>
        
        <div className="relative flex justify-center lg:justify-end w-full">
          <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[500px]">
            <Image 
              src="/smart-home-automation.png"
               alt="Smart Home IoT Ecosystem"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#EAA832]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Always Connected</div>
                  <div className="text-sm text-gray-500">WiFi Enabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Products Section
const ProductsSection = () => {
  const products = [
    {
      name: "Aurora RGB Touch Lamp",
      description: "16 million colors, touch control, perfect for bedrooms and living spaces. Create any mood with our signature RGB lamp.",
      price: "₹1,499",
      originalPrice: "₹2,499",
      image: "/product-lamp-rgb.png",
      badge: "Best Seller",
      features: ["Touch Control", "16M Colors", "App Control", "Timer Function"], 
      buyLink: "https://amzn.in/d/080TItzR"
    },
    {
      name: "Glow Warm Table Lamp",
      description: "Warm ambient lighting for cozy evenings. Dimmable brightness with elegant minimalist design.",
      price: "₹999",
      originalPrice: "₹1,799",
      image: "/product-lamp-warm.jpg",
      badge: "New",
      features: ["Warm White", "Dimmable", "Eye-Care", "Sleep Mode"],
      buyLink: "https://amzn.in/d/0j5ybKT7"
    },
    {
      name: "Spiral Designer Lamp",
      description: "Statement piece for modern homes. 3D printed spiral design with warm ambient glow.",
      price: "₹1,799",
      originalPrice: "₹2,999",
      image: "/product-lamp-spiral.jpg",
      badge: "Premium",
      features: ["Designer", "3D Printed", "Warm Glow", "Unique Style"],
      buyLink: "https://amzn.in/d/080TItzR"
    }
  ];

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold mb-4">OUR PRODUCTS</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Smart Devices for Every Home
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of smart IoT products designed to make your home smarter and more connected.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col"
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 p-8">
                <span className="absolute top-4 left-4 bg-[#EAA832] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#EAA832]">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <a 
                    href={product.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 hover:bg-[#EAA832] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">More products coming soon!</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-white px-4 py-2 rounded-full border">Smart Switches</span>
            <span className="bg-white px-4 py-2 rounded-full border">Smart Extension Boards</span>
            <span className="bg-white px-4 py-2 rounded-full border">Smart Bulbs</span>
            <span className="bg-white px-4 py-2 rounded-full border">Motion Sensors</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "App Controlled",
      description: "Control all your smart devices from anywhere using our free VoltLabs app. Available on Android and iOS."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: "Voice Control Ready",
      description: "Works seamlessly with Google Assistant and Amazon Alexa for hands-free control of your smart home."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      title: "WiFi Connectivity",
      description: "Connect your devices to your home WiFi for seamless control from anywhere in the world."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Smart Automation",
      description: "Set schedules, timers, and automation routines. Your devices work for you even when you're away."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Safe & Secure",
      description: "BIS certified products with encrypted data transmission. Your smart home stays safe and private."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Easy Setup",
      description: "Plug, connect, and control in under 2 minutes. No technical expertise or electrician needed."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold mb-4">WHY VOLTLABS</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Smart Features, Simple Living
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our IoT devices are designed to make your life easier — connect, control, and automate your home effortlessly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl border border-gray-100 hover:border-[#EAA832]/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#EAA832]/10 rounded-2xl flex items-center justify-center text-[#EAA832] mb-6 group-hover:bg-[#EAA832] group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => (
  <section id="about" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-[#EAA832]/20 text-[#EAA832] px-4 py-2 rounded-full text-sm font-semibold">ABOUT VOLTLABS</span>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Making Smart Homes Accessible to Everyone
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            VoltLabs was founded with a simple mission: bring affordable, high-quality smart home products to Indian households. We believe everyone deserves a home that&apos;s comfortable, efficient, and beautifully lit.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Based in New Delhi, we design products that combine international quality with prices that make sense for Indian families. Every product undergoes rigorous testing to ensure safety, reliability, and long-lasting performance.
          </p>
          
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#EAA832]">100%</div>
              <div className="text-gray-400 text-sm mt-1">Quality Tested</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#EAA832]">BIS</div>
              <div className="text-gray-400 text-sm mt-1">Certified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#EAA832]">24/7</div>
              <div className="text-gray-400 text-sm mt-1">Support</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-[#EAA832] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Quality First</h4>
                <p className="text-gray-400 text-sm">Every product tested for 500+ hours before shipping</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-[#EAA832] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Fair Pricing</h4>
                <p className="text-gray-400 text-sm">Premium quality at honest prices, no hidden costs</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-[#EAA832] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Made for India</h4>
                <p className="text-gray-400 text-sm">Designed for Indian homes, voltage and climate tested</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-[#EAA832] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Customer Love</h4>
                <p className="text-gray-400 text-sm">Dedicated support team to help you anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Product",
      description: "Browse our collection of smart lamps and find the perfect fit for your space and style."
    },
    {
      number: "02",
      title: "Quick Setup",
      description: "Plug in, download our free app, and connect your lamp to WiFi in under 2 minutes."
    },
    {
      number: "03",
      title: "Control & Customize",
      description: "Adjust colors, brightness, schedules, and scenes. Use the app or voice commands."
    },
    {
      number: "04",
      title: "Enjoy Smart Living",
      description: "Experience the comfort of a smart home. Set the perfect ambiance for every moment."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold mb-4">HOW IT WORKS</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Set Up in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No complicated installation. No electrician needed. Just plug, connect, and enjoy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow">
                <span className="text-5xl font-bold text-[#EAA832]/20">{step.number}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Absolutely love my VoltLabs RGB lamp! The colors are vibrant and the app is super easy to use. Perfect for my daughter's room.",
      verified: true
    },
    {
      name: "Rahul Verma",
      location: "Bangalore",
      rating: 5,
      text: "Best smart lamp I've used. The build quality is excellent and the price is unbeatable. Already ordered two more!",
      verified: true
    },
    {
      name: "Anita Patel",
      location: "Delhi",
      rating: 5,
      text: "The spiral lamp looks stunning in my bedroom. Gets so many compliments from guests. Highly recommend VoltLabs!",
      verified: true
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold mb-4">TESTIMONIALS</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by Customers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their VoltLabs experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#EAA832]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: "How do I connect the lamp to my phone?",
      answer: "Simply download the VoltLabs app from Play Store or App Store, plug in your lamp, and follow the in-app setup. It takes less than 2 minutes to connect via WiFi."
    },
    {
      question: "What is the warranty period?",
      answer: "All VoltLabs products come with a 1-year manufacturer warranty. If you face any issues, our support team will help you with repair or replacement."
    },
    {
      question: "Can I use the lamp without the app?",
      answer: "Absolutely! All our lamps have touch controls for basic functions like on/off and brightness. The app unlocks advanced features like colors, schedules, and scenes."
    },
    {
      question: "Do you offer Cash on Delivery?",
      answer: "Yes, we offer COD across India. You can also pay online via UPI, cards, or net banking for faster processing."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold mb-4">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Common Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about VoltLabs products.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white rounded-2xl">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 bg-gray-100 group-open:bg-[#EAA832] rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-gray-600 group-open:text-white group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => (
  <section className="py-24 bg-[#EAA832]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
        Ready to Make Your Home Smarter?
      </h2>
      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Join thousands of happy customers who have transformed their homes with VoltLabs smart IoT devices.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="https://www.amazon.in/stores/VoltLabs/page/417214B6-FD85-46C7-89D4-401DFC5C7732?lp_asin=B0FXVM966H&ref_=cm_sw_r_ud_ast_store_1G952ME5NPWS3TQPS3YH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white text-[#EAA832] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          Shop Now
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a 
          href="#contact"
          className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#EAA832] transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
);

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Product Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '28e97e7e-c64b-41c6-b0b2-7bc36a1ca985',
          ...formData,
          from_name: 'VoltLabs Website Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: 'Product Inquiry',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <span className="inline-block bg-[#EAA832]/10 text-[#D4922A] px-4 py-2 rounded-full text-sm font-semibold">CONTACT US</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              We&apos;re Here to Help
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions about our products? Need help with setup? Our friendly support team is just a message away.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#EAA832]/10 rounded-xl flex items-center justify-center text-[#EAA832]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email us at</div>
                  <div className="font-semibold text-gray-900">care@voltlabs.in</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#EAA832]/10 rounded-xl flex items-center justify-center text-[#EAA832]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call or WhatsApp</div>
                  <div className="font-semibold text-gray-900">+91 8178902630</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#EAA832]/10 rounded-xl flex items-center justify-center text-[#EAA832]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Office Address</div>
                  <div className="font-semibold text-gray-900 text-sm">KH NO 242, Naya Lal Dora Bans, Near SDM Office, New Delhi - 110081</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-4">Follow us on social media</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#EAA832] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#EAA832] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#EAA832] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#EAA832] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-green-800">Message sent successfully!</p>
                  <p className="text-sm text-green-600">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-800">Failed to send message</p>
                  <p className="text-sm text-red-600">Please try again or contact us directly via WhatsApp.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all bg-white"
                >
                  <option>Product Inquiry</option>
                  <option>Order Status</option>
                  <option>Technical Support</option>
                  <option>Warranty Claim</option>
                  <option>Bulk Order</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#EAA832] hover:bg-[#D4922A] disabled:bg-[#EAA832]/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#EAA832]/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-white">VoltLabs</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Making smart homes accessible to everyone. Premium quality smart lighting at honest prices.
          </p>
          <a 
            href="https://wa.me/918178902630?text=Hi%20VoltLabs!%20I%20have%20a%20question%20about%20your%20products."
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
            {["Smart Lamps", "RGB Lights", "Table Lamps", "Night Lights", "Coming Soon"].map((item) => (
              <li key={item}>
                <a href="#products" className="text-gray-400 hover:text-[#EAA832] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4">
            {["FAQ", "Shipping Info", "Returns", "Warranty", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#faq" className="text-gray-400 hover:text-[#EAA832] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-gray-400 mb-4">Get updates on new products and offers.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:border-[#EAA832] outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-[#EAA832] hover:bg-[#D4922A] text-white px-4 py-3 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
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

// Floating WhatsApp Button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/918178902630?text=Hi%20VoltLabs!%20I%20have%20a%20question%20about%20your%20products."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
    aria-label="Chat on WhatsApp"
  >
    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    {/* Tooltip */}
    <span className="absolute right-16 bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Chat with us
    </span>
  </a>
);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <AboutSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
