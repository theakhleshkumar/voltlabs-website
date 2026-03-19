export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  images: string[];
  badge: string;
  features: string[];
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  aboutPoints?: string[];
  buyLink: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    slug: "smart-table-rgb-touch-lamp",
    name: "Smart Table RGB Touch Lamp",
    shortDescription: "Touch Sensor RGB Color Changing Night Light with 7 Colors",
    description: "Transform your space with our Smart Table RGB Touch Lamp. This versatile lamp features 7 vibrant colors that you can cycle through with a simple touch. Perfect for creating the right ambiance in your bedroom, living room, or as a night light for kids. USB powered for convenience, this lamp combines modern design with practical functionality.",
    price: 799,
    originalPrice: 2999,
    currency: "INR",
    images: ["/product-lamp-rgb.png"],
    badge: "Best Seller",
    features: ["Smart Lamp", "Night Lamp", "Table Lamp", "Touch Control", "7 Colors", "RGB", "USB Powered"],
    highlights: [
      { icon: "touch", title: "Touch Control", description: "Simply tap to change colors and brightness" },
      { icon: "colors", title: "7 RGB Colors", description: "Choose from 7 vibrant color options" },
      { icon: "usb", title: "USB Powered", description: "Convenient USB power - use with any adapter or power bank" },
      { icon: "warranty", title: "1 Year Warranty", description: "Full manufacturer warranty coverage" }
    ],
    specifications: [
      { label: "Power Source", value: "USB (5V)" },
      { label: "Light Colors", value: "7 RGB Colors" },
      { label: "Control Type", value: "Touch Sensor" },
      { label: "Material", value: "ABS + Silicone" },
      { label: "Suitable For", value: "Bedroom, Study, Kids Room" },
      { label: "Warranty", value: "1 Year" }
    ],
    buyLink: "https://amzn.in/d/080TItzR",
    inStock: true,
    rating: 4.5,
    reviewCount: 127
  },
  {
    slug: "smart-table-touch-lamp",
    name: "Smart Table Touch Lamp",
    shortDescription: "3-Way Dimmable Modern Touch Control Bedside Lamp (10%, 50%, 100%)",
    description: "Transform your space with this Smart LED Touch Control Table Lamp — a perfect blend of modern design and convenience. This smart table lamp features 3 level dimming (10%, 50%, 100%) that allows you to set the right brightness for reading, studying, relaxing, or sleeping. Its touch-sensitive surface ensures smooth, effortless control — just tap to adjust brightness or turn it on/off. Compact and elegant, the lamp's sleek cylindrical body with soft white diffuser and grey base makes it ideal for any modern interior. Whether it's your bedside table, study desk, or living room corner, this smart LED lamp adds a warm, cozy glow that enhances any ambience. Experience comfort, simplicity, and style in one lamp — your perfect bedside companion for both day and night.",
    price: 799,
    originalPrice: 2999,
    currency: "INR",
    images: ["/product-lamp-warm.jpg"],
    badge: "New",
    features: ["3-Way Dimming", "Touch Control", "LED Table Lamp", "Energy Efficient", "Flicker-Free", "Made in India", "Compact Design", "Home Décor"],
    highlights: [
      { icon: "dimmer", title: "3-Way Dimming", description: "10%, 50%, 100% brightness levels for any mood" },
      { icon: "touch", title: "Touch Control", description: "Simply tap to switch brightness - no buttons needed" },
      { icon: "design", title: "Compact & Modern", description: "Sleek cylindrical design fits any space" },
      { icon: "warranty", title: "1 Year Warranty", description: "Full manufacturer warranty coverage" }
    ],
    specifications: [
      { label: "Power Source", value: "Corded Electric (5V)" },
      { label: "Brightness Levels", value: "3 (10%, 50%, 100%)" },
      { label: "Light Source", value: "LED" },
      { label: "Wattage", value: "5 Watts" },
      { label: "Switch Type", value: "Touch" },
      { label: "Bulb Base", value: "B15D" },
      { label: "Base Material", value: "Plastic (Matte Finish)" },
      { label: "Shade Material", value: "Plastic" },
      { label: "Shade Colour", value: "White" },
      { label: "Shape", value: "Cylindrical" },
      { label: "Dimensions", value: "10D × 10W × 13H cm" },
      { label: "Weight", value: "300 Grams" },
      { label: "Style", value: "Modern" },
      { label: "Suitable For", value: "Bedroom, Living Room, Office, Study" },
      { label: "Country of Origin", value: "India" },
      { label: "In The Box", value: "Lamp Base, Lamp Shade" },
      { label: "Warranty", value: "1 Year Manufacturer" }
    ],
    aboutPoints: [
      "Smooth 3-Way Dimming – Enjoy 3 brightness levels (10%, 50%, 100%) to match your mood — from a gentle night glow to bright reading light. Perfect for bedrooms, study tables, or living spaces.",
      "Touch Control Operation – Simply tap the lamp to switch brightness levels. No switches or buttons — the touch-sensitive design makes it easy and modern to use, even in the dark.",
      "Compact & Modern Design – Standing 135mm tall with a 100mm diameter, this smart table lamp fits perfectly on bedside tables, study desks, or small shelves. Its minimalist grey-and-white design blends with any décor.",
      "Versatile Smart Lighting – Use as a smart LED table lamp, bedside reading light, study lamp, or ambient night light. Ideal for bedrooms, offices, kids' rooms, and home décor.",
      "Energy-Efficient & Long-Lasting – Built with premium LED technology for soft, flicker-free light and low power consumption. Provides consistent brightness and long life for daily use."
    ],
    buyLink: "https://www.amazon.in/dp/B0FXVM966H",
    inStock: true,
    rating: 5.0,
    reviewCount: 1
  },
  {
    slug: "modern-spiral-table-lamp",
    name: "Modern Spiral Table Lamp",
    shortDescription: "Elegant Spiral Design with 3 Light Modes - Warm, Cool & Natural White",
    description: "Transform your space with this elegant modern spiral table lamp featuring three adjustable light modes — Warm White, Cool White and Natural White. Designed to create a calming ambience, this lamp uses an E27 LED bulb to deliver smooth, flicker-free illumination that enhances any room. Its contemporary spiral pattern adds a stylish touch to bedrooms, living rooms, study tables and workspaces. Choose warm light for a cozy vibe, cool white for clarity during work, or natural white for balanced everyday lighting. Perfect for reading, night-time glow, home décor styling and aesthetic room setups. Made with a sturdy base and premium finish, this lamp is energy-efficient, long-lasting and ideal for modern homes. It also makes a thoughtful gift for house-warmings and festive occasions.",
    price: 749,
    originalPrice: 1499,
    currency: "INR",
    images: ["/product-lamp-spiral.jpg"],
    badge: "Premium",
    features: ["3 Light Modes", "E27 LED Bulb", "Touch Switch", "Energy Efficient", "Flicker-Free", "Made in India", "Modern Design", "Gift Ready"],
    highlights: [
      { icon: "modes", title: "3 Light Modes", description: "Warm White, Cool White & Natural White for every mood" },
      { icon: "bulb", title: "E27 LED Bulb", description: "Smooth, flicker-free eye-friendly lighting included" },
      { icon: "touch", title: "Touch Control", description: "Easy touch switch operation - no buttons needed" },
      { icon: "warranty", title: "1 Year Warranty", description: "Full manufacturer warranty coverage" }
    ],
    specifications: [
      { label: "Power Source", value: "Corded Electric (240V)" },
      { label: "Light Modes", value: "Warm, Cool, Natural White" },
      { label: "Bulb Type", value: "E27 LED (included)" },
      { label: "Wattage", value: "12 Watts" },
      { label: "Switch Type", value: "Touch" },
      { label: "Base Material", value: "Plastic (Matte Finish)" },
      { label: "Shade Material", value: "Glass" },
      { label: "Shade Colour", value: "White" },
      { label: "Dimensions", value: "17D × 17W × 23H cm" },
      { label: "Weight", value: "250 Grams" },
      { label: "Style", value: "Modern Spiral" },
      { label: "Suitable For", value: "Bedroom, Living Room, Study, Office" },
      { label: "Country of Origin", value: "India" },
      { label: "Warranty", value: "1 Year" }
    ],
    aboutPoints: [
      "Modern Spiral Design – Stylish contemporary pattern that enhances home décor. Adds a premium aesthetic touch to nightstands, side tables and workspaces.",
      "3 Light Modes for Every Mood – Choose between Warm White, Cool White and Natural White to match reading, relaxation or work needs. Perfect for bedrooms, living rooms and study tables.",
      "Versatile Placement – Compact yet striking design makes it suitable for bedside tables, office desks, or living room side tables.",
      "Modern Aesthetic – Sculptural spiral pattern adds visual interest and creates beautiful light diffusion patterns.",
      "Sturdy & Compact Build – Strong base prevents wobbling, making it safe for homes with kids or pets. Lightweight yet durable design fits easily in any room setup.",
      "Soft & Flicker-Free Light – E27 LED bulb ensures smooth, eye-friendly lighting. Ideal for nighttime use, ambience creation and mood lighting.",
      "Energy Efficient & Long Lasting – LED technology consumes less power while offering a longer lifespan. Perfect for everyday use with minimal maintenance.",
      "Perfect Gift Choice – Ideal for birthdays, housewarming, festive gifts and modern home setups. A premium décor accessory for friends, family and office spaces."
    ],
    buyLink: "https://www.amazon.in/dp/B0G3KYT8ZR",
    inStock: true,
    rating: 4.4,
    reviewCount: 2
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}

export function getRelatedProducts(currentSlug: string, limit: number = 2): Product[] {
  return products.filter(p => p.slug !== currentSlug).slice(0, limit);
}
