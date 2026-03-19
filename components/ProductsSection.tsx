import Image from "next/image";

const ProductsSection = () => {
  const products = [
    {
      name: "Smart Table RGB Touch Lamp",
      description: "Touch Sensor Table Lamp, RGB Color Changing Night Light, 7 Colors, USB Powered, Bedside and Desk Light with Tap Control",
      price: "₹799",
      originalPrice: "₹2,999",
      image: "/product-lamp-rgb.png",
      badge: "Best Seller",
      features: ["Smart Lamp", "Night Lamp", "Table Lamp", "Touch Control", "7 Colors", "RGB", "USB Powered"],
      buyLink: "https://amzn.in/d/080TItzR"
    },
    {
      name: "Smart Table Touch Lamp",
      description: "Smart Table Lamp | Smart LED Touch Control Bedside Lamp | 3-Way Dimmable Modern Table Light for Bedroom, Study & Living Room | Compact, Stylish, Adjustable Brightness Night Lamp for Home Décor",
      price: "₹799",
      originalPrice: "₹2,999",
      image: "/product-lamp-warm.jpg",
      badge: "New",
      features: ["Smart Lamp", "Night Lamp", "Table Lamp", "Touch Control", "3-Way Dimmable", "Adjustable Brightness", "Home Décor"],
      buyLink: "https://amzn.in/d/0j5ybKT7"
    },
    {
      name: "Modern Spiral Table Lamp",
      description: "Modern Spiral Table Lamp with 3 Light Modes (Warm, Cool & Natural White) | E27 LED Bedside Night Lamp for Bedroom, Living Room & Home Décor | Soft Ambient Lighting",
      price: "₹799",
      originalPrice: "₹1,499",
      image: "/product-lamp-spiral.jpg",
      badge: "Premium",
      features: ["Night Lamp", "Spiral", "3 Light Modes", "Warm", "Cool", "Natural White", "E27 LED", "Home Décor"],
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

export default ProductsSection;
