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
    description: "Make a statement with our Modern Spiral Table Lamp – a perfect blend of art and functionality. The unique spiral design creates a mesmerizing visual effect while providing soft, ambient lighting. Choose from 3 light modes (Warm White, Cool White, and Natural White) to match your mood and activity. Features standard E27 LED bulb compatibility for easy replacement and energy efficiency. Ideal as a centerpiece for your bedroom, living room, or as an elegant home décor accent.",
    price: 799,
    originalPrice: 1499,
    currency: "INR",
    images: ["/product-lamp-spiral.jpg"],
    badge: "Premium",
    features: ["Night Lamp", "Spiral Design", "3 Light Modes", "Warm White", "Cool White", "Natural White", "E27 LED", "Home Décor"],
    highlights: [
      { icon: "design", title: "Unique Spiral Design", description: "Eye-catching sculptural design that doubles as décor" },
      { icon: "modes", title: "3 Light Modes", description: "Warm, Cool, and Natural White options" },
      { icon: "bulb", title: "E27 LED Compatible", description: "Standard bulb fitting - easy to replace" },
      { icon: "warranty", title: "1 Year Warranty", description: "Full manufacturer warranty coverage" }
    ],
    specifications: [
      { label: "Power Source", value: "AC 220V" },
      { label: "Light Modes", value: "Warm, Cool, Natural White" },
      { label: "Bulb Type", value: "E27 LED (included)" },
      { label: "Material", value: "Premium Acrylic + Metal Base" },
      { label: "Dimensions", value: "30cm (H) x 12cm (Base)" },
      { label: "Suitable For", value: "Bedroom, Living Room, Office" },
      { label: "Warranty", value: "1 Year" }
    ],
    buyLink: "https://amzn.in/d/080TItzR",
    inStock: true,
    rating: 4.7,
    reviewCount: 203
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
