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
    shortDescription: "3-Way Dimmable Modern Touch Control Bedside Lamp",
    description: "Elevate your home décor with our Smart Table Touch Lamp. Featuring 3-way dimmable brightness levels, this elegant lamp lets you set the perfect ambiance for any occasion. The modern design complements any interior style while the touch control makes operation effortless. Ideal for bedrooms, study rooms, and living spaces.",
    price: 799,
    originalPrice: 2999,
    currency: "INR",
    images: ["/product-lamp-warm.jpg"],
    badge: "New",
    features: ["Smart Lamp", "Night Lamp", "Table Lamp", "Touch Control", "3-Way Dimmable", "Adjustable Brightness", "Home Décor"],
    highlights: [
      { icon: "touch", title: "Touch Control", description: "Elegant touch-sensitive base for easy control" },
      { icon: "dimmer", title: "3 Brightness Levels", description: "Low, medium, and high brightness options" },
      { icon: "design", title: "Modern Design", description: "Sleek aesthetic that fits any décor" },
      { icon: "warranty", title: "1 Year Warranty", description: "Full manufacturer warranty coverage" }
    ],
    specifications: [
      { label: "Power Source", value: "AC 220V" },
      { label: "Brightness Levels", value: "3 (Low, Medium, High)" },
      { label: "Control Type", value: "Touch Sensor" },
      { label: "Material", value: "Premium ABS" },
      { label: "Suitable For", value: "Bedroom, Study, Living Room" },
      { label: "Warranty", value: "1 Year" }
    ],
    buyLink: "https://amzn.in/d/0j5ybKT7",
    inStock: true,
    rating: 4.3,
    reviewCount: 89
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
