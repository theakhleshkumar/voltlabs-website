import Image from "next/image";

// Lightning Bolt SVG Component
const LightningBolt = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="50" cy="50" r="48" fill="#EAA832"/>
    <path d="M55 15L30 52h18L38 85l32-40H52L55 15z" fill="white"/>
  </svg>
);

// Navigation Component
const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium">Services</a>
          <a href="#about" className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium">About</a>
          <a href="#work" className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium">Our Work</a>
          <a href="#contact" className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium">Contact</a>
        </div>
        <a 
          href="#contact"
          className="bg-[#EAA832] hover:bg-[#D4922A] text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[#EAA832]/30"
        >
          Get Started
        </a>
      </div>
    </div>
  </nav>
);

// Hero Section
const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FEF9F0] to-[#FFF8E7]" />
    <div className="absolute top-20 right-10 w-72 h-72 bg-[#EAA832]/10 rounded-full blur-3xl" />
    <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#EAA832]/5 rounded-full blur-3xl" />
    
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#EAA832]/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-[#EAA832] rounded-full animate-pulse" />
            <span className="text-[#D4922A] font-medium text-sm">Powering the Connected World</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Smart IoT</span>
            <br />
            <span className="text-gradient">Hardware</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            We design and manufacture cutting-edge IoT devices that connect your world. 
            From smart sensors to industrial solutions, VoltLabs powers the future of connectivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#EAA832] hover:bg-[#D4922A] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-[#EAA832]/30 hover:-translate-y-1"
            >
              Start Your Project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="#work"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#EAA832] text-gray-700 hover:text-[#EAA832] px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              View Our Work
            </a>
          </div>
          
          <div className="flex items-center gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-500">Devices Deployed</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <div className="text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-gray-500">Uptime Reliability</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-gray-500">Patents Filed</div>
            </div>
          </div>
        </div>
        
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 animate-float">
              <LightningBolt className="w-full h-full drop-shadow-2xl" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-pulse-glow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Project Complete</div>
                  <div className="text-sm text-gray-500">Just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Smart Sensors",
      description: "High-precision environmental, motion, and industrial sensors with real-time data transmission and edge computing capabilities."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Industrial IoT",
      description: "Rugged, industrial-grade devices for manufacturing, logistics, and automation. Built for harsh environments and 24/7 operation."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Smart Home Devices",
      description: "Connected home solutions including smart thermostats, lighting controllers, security systems, and energy monitors."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      title: "Connectivity Modules",
      description: "Wi-Fi, Bluetooth, LoRa, Zigbee, and cellular modules for seamless device communication. Low-power, long-range solutions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Embedded Systems",
      description: "Custom PCB design and firmware development. From microcontrollers to edge AI processors, we build the brains of your devices."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "IoT Platforms",
      description: "Cloud dashboards and mobile apps for device management, data visualization, OTA updates, and analytics."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#EAA832] font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            End-to-End IoT Hardware Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From prototype to mass production, we design and manufacture IoT devices that connect and transform industries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#EAA832]/10 rounded-2xl flex items-center justify-center text-[#EAA832] mb-6 group-hover:bg-[#EAA832] group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="bg-gradient-to-br from-[#EAA832] to-[#D4922A] rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#EAA832]">10+</div>
                  <div className="text-gray-600 mt-2">Years in Hardware</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#EAA832]">35+</div>
                  <div className="text-gray-600 mt-2">Engineers & Designers</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#EAA832]">100+</div>
                  <div className="text-gray-600 mt-2">Products Launched</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#EAA832]">20+</div>
                  <div className="text-gray-600 mt-2">Countries Deployed</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 top-8 left-8 w-full h-full bg-[#EAA832]/20 rounded-3xl" />
        </div>
        
        <div className="space-y-6">
          <span className="text-[#EAA832] font-semibold text-sm uppercase tracking-wider">About VoltLabs</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Pioneering IoT Hardware Innovation
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded by hardware engineers with a passion for connectivity, VoltLabs has grown into a 
            leading IoT hardware manufacturer. We combine cutting-edge electronics design with robust 
            firmware development to create devices that power the connected world.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our team of embedded systems experts, PCB designers, and IoT architects work together to 
            bring your hardware vision to life. From concept to certification, we handle every step.
          </p>
          
          <div className="space-y-4 pt-4">
            {["In-House PCB Design & Assembly", "Rapid Prototyping (2-Week Turnaround)", "FCC/CE/UL Certification Support", "Scalable Manufacturing Partners"].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#EAA832] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Work/Portfolio Section
const WorkSection = () => {
  const projects = [
    {
      title: "Smart Factory Sensors",
      category: "Industrial IoT",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    {
      title: "Connected Thermostat",
      category: "Smart Home",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop"
    },
    {
      title: "Fleet Tracking Module",
      category: "GPS & Telematics",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="work" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#EAA832] font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Hardware That Powers Industries
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of IoT devices deployed across smart homes, factories, and cities worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gray-800"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[#EAA832] text-sm font-medium">{project.category}</span>
                <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
              </div>
              <div className="absolute inset-0 bg-[#EAA832]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 text-[#EAA832] font-semibold text-lg hover:underline"
          >
            See All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "VoltLabs designed our entire sensor array for our smart factory. The reliability is incredible - zero downtime in 18 months of operation.",
      author: "James Mitchell",
      role: "VP of Operations, AutoMfg Corp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      quote: "Their hardware team took our concept from napkin sketch to certified product in just 4 months. The firmware quality is exceptional.",
      author: "Dr. Lisa Park",
      role: "CTO, HealthTech Devices",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      quote: "We've deployed 10,000+ VoltLabs modules across our fleet. Battery life and GPS accuracy exceeded all specifications. Truly reliable hardware.",
      author: "Robert Kowalski",
      role: "Director of Logistics, TransGlobal",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#FEF9F0] to-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#EAA832] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What Our Clients Say
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg relative"
            >
              <div className="absolute -top-4 left-8 w-8 h-8 bg-[#EAA832] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 pt-4">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => (
  <section id="contact" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <span className="text-[#EAA832] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Let&apos;s Build Your Next IoT Device
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ready to bring your hardware idea to life? Get in touch with us today and let&apos;s discuss 
            how VoltLabs can design and manufacture your next connected device.
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
                <div className="font-semibold text-gray-900">hello@voltlabs.com</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#EAA832]/10 rounded-xl flex items-center justify-center text-[#EAA832]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Call us at</div>
                <div className="font-semibold text-gray-900">+1 (555) 123-4567</div>
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
                <div className="text-sm text-gray-500">Visit us at</div>
                <div className="font-semibold text-gray-900">123 Innovation Drive, Tech City</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all bg-white"
              >
                <option>Select a product category</option>
                <option>Smart Sensors</option>
                <option>Industrial IoT</option>
                <option>Smart Home Devices</option>
                <option>Connectivity Modules</option>
                <option>Custom Embedded Systems</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#EAA832] hover:bg-[#D4922A] text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#EAA832]/30"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} className="w-10 h-10" />
          </div>
          <p className="text-gray-400 leading-relaxed">
            Designing and manufacturing innovative IoT hardware that connects the world. From sensors to systems.
          </p>
          <div className="flex gap-4">
            {["twitter", "linkedin", "github", "instagram"].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#EAA832] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <span className="sr-only">{social}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Products</h4>
          <ul className="space-y-4">
            {["Smart Sensors", "Industrial IoT", "Smart Home", "Connectivity Modules", "Custom Hardware"].map((item) => (
              <li key={item}>
                <a href="#services" className="text-gray-400 hover:text-[#EAA832] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4">
            {["About Us", "Our Work", "Careers", "Blog", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-[#EAA832] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
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
          <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
