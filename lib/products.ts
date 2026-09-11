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
  inStock: boolean;
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
    inStock: true
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
    inStock: true
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
    inStock: true
  },
  {
    slug: "glowsync-sl01-smart-rgb-table-lamp",
    name: "GlowSync SL01 Smart RGB Table Lamp",
    shortDescription: "App-Controlled Bedside Lamp with 16 Million Colours, Scenes & Scheduling",
    description: "The VoltLabs GlowSync SL01 is a smart table lamp for people who want light that fits the moment rather than one fixed white bulb. Pair it with the free VoltLabs Android app to pick any shade from the colour wheel, or type exact RGB values when you have found a colour you want back again. Brightness runs from a dim night-light glow up to full reading light. Preset scenes move the lamp between reading, work, relax, movie and party in a single tap, including dynamic modes that fade slowly between colours on their own. Schedules are handled by the lamp itself rather than the phone, so they keep working whether your phone is nearby or not. When you would rather not reach for a phone at all, the touch panel on the base covers on, off, brightness and colour cycling directly. Runs on 5V over USB-C from any standard phone adapter or power bank.",
    price: 999,
    originalPrice: 2499,
    currency: "INR",
    images: ["/product-lamp-glowsync.jpg"],
    badge: "App Control",
    features: ["App Control", "16M Colours", "Scene Modes", "Scheduling Timer", "Touch Control", "USB-C Powered", "Made in India"],
    highlights: [
      { icon: "colors", title: "16 Million Colours", description: "Pick from the colour wheel or enter exact RGB values" },
      { icon: "modes", title: "Scene & Mood Modes", description: "Reading, work, relax, movie and party in one tap" },
      { icon: "touch", title: "Touch Control", description: "On, off, brightness and colour cycling without the app" },
      { icon: "usb", title: "USB-C Powered", description: "Runs on 5V from any phone adapter or power bank" }
    ],
    specifications: [
      { label: "Model Number", value: "VL-SL01" },
      { label: "Control Method", value: "Android App, Touch" },
      { label: "Colours", value: "16 Million RGB" },
      { label: "Light Source", value: "LED" },
      { label: "Power Source", value: "Corded Electric (USB-C)" },
      { label: "Voltage", value: "5 Volts (DC)" },
      { label: "Wattage", value: "9 Watts" },
      { label: "Switch Type", value: "Touch" },
      { label: "Mounting Type", value: "Tabletop" },
      { label: "Number of Lights", value: "1" },
      { label: "In the Box", value: "Lamp, USB-C cable, user manual" },
      { label: "Suitable For", value: "Bedroom, Living Room, Study Room" },
      { label: "Indoor / Outdoor", value: "Indoor" },
      { label: "Country of Origin", value: "India" },
      { label: "Warranty", value: "1 Year" }
    ],
    aboutPoints: [
      "Control It From Your Phone – Pair the lamp with the free VoltLabs app on any Android phone to change colour, set brightness, switch scenes and run schedules from wherever you are sitting. Please note the app is currently available for Android only; an iOS version is in development.",
      "16 Million Colours, Set by RGB Value – Pick any shade from the in-app colour wheel, or enter exact RGB values when you want a specific colour repeated every time. Brightness is adjustable across the full range, from a soft night glow to full reading light.",
      "Scene and Mood Modes – Preset scenes shift the lamp to suit what you are doing: reading, working, relaxing, movie night or party, with a single tap. Dynamic modes cycle and fade between colours on their own.",
      "Schedule On and Off Times – Set the lamp to switch on before you get home, wake you with a gentle glow in the morning, or turn itself off after you fall asleep. Schedules run on the lamp, so they keep working without your phone nearby.",
      "Touch Control on the Lamp Itself – A responsive touch panel on the base handles on, off, brightness and colour cycling without opening the app.",
      "USB-C Powered for Flexible Placement – Operates on 5V through USB-C, so it works with any standard phone adapter or power bank on a desk, bedside table or shelf without needing a dedicated wall socket.",
      "Complete Package Included – Comes with the GlowSync SL01 lamp, a USB-C cable and a user manual, plus a 12 month VoltLabs warranty against manufacturing defects."
    ],
    inStock: true
  },
  {
    slug: "ribbed-table-lamp",
    name: "Ribbed Table Lamp",
    shortDescription: "Ribbed Shade with 3-Colour LED Bulb - Warm, Natural & Cool White",
    description: "Elevate your living space with this modern ribbed table lamp, designed to bring warmth and style to any room. It comes with a high-quality E27 LED bulb offering three switchable light colours — warm white for a cosy mood, natural white for everyday use, and cool white for bright, focused light — so you can set the right atmosphere for any moment. The fluted cylindrical shade diffuses the light softly, creating a relaxing, inviting glow that works as a bedside lamp, nightstand light, or accent piece in your living room, office or entryway. The clean contrast between the ribbed white shade and the sleek matte black base gives the lamp a refined, minimalist character that complements Scandinavian, contemporary and modern décor. Its compact cylindrical shape fits neatly on side tables, shelves or desks without overwhelming the space. Setting it up is simple — plug into any standard Indian wall socket and switch on. The LED bulb is energy-saving, long-lasting and easily replaceable if ever needed.",
    price: 699,
    originalPrice: 1999,
    currency: "INR",
    images: ["/product-lamp-ribbed.jpg"],
    badge: "Minimalist",
    features: ["3 Light Colours", "E27 LED Bulb", "Ribbed Shade", "Plug & Play", "Energy Saving", "Made in India", "Modern Design", "Gift Ready"],
    highlights: [
      { icon: "modes", title: "3 Light Colours", description: "Warm 3000K, Natural 4000K and Cool 6500K in one bulb" },
      { icon: "dimmer", title: "Soft Ambient Glow", description: "Fluted shade diffuses the light, with no harsh glare" },
      { icon: "design", title: "Minimalist Two-Tone", description: "Matte black base with a ribbed white shade" },
      { icon: "warranty", title: "1 Year Warranty", description: "Covers the lamp, cord, switch and bulb" }
    ],
    specifications: [
      { label: "Model Number", value: "Rbl-mb-001" },
      { label: "Bulb Base", value: "E27 (replaceable)" },
      { label: "Light Colours", value: "Warm 3000K, Natural 4000K, Cool 6500K" },
      { label: "Light Source", value: "LED" },
      { label: "Power Source", value: "Corded Electric" },
      { label: "Voltage", value: "220 Volts" },
      { label: "Wattage", value: "12 Watts" },
      { label: "Switch Type", value: "In-line Push Button" },
      { label: "Mounting Type", value: "Tabletop" },
      { label: "Dimensions", value: "10D × 10W × 20H cm" },
      { label: "Shade Height", value: "14 cm" },
      { label: "Weight", value: "250 Grams" },
      { label: "Finish", value: "Matte" },
      { label: "Colour", value: "Black and White" },
      { label: "Shape", value: "Ribbed" },
      { label: "Base & Shade Material", value: "Plastic" },
      { label: "In the Box", value: "Lamp (fully assembled), LED bulb, power cord" },
      { label: "Suitable For", value: "Bedroom, Living Room, Study, Dressing Room" },
      { label: "Indoor / Outdoor", value: "Indoor" },
      { label: "Water Resistance", value: "Not water resistant" },
      { label: "Country of Origin", value: "India" },
      { label: "Warranty", value: "1 Year" }
    ],
    aboutPoints: [
      "Warm Ambient Glow – The fluted white cylindrical shade diffuses light softly, creating a cosy, relaxing atmosphere perfect for unwinding or reading.",
      "3 Light Colours in One – Includes a high-quality E27 LED bulb with three switchable modes: Warm White (3000K), Natural White (4000K) and Cool White (6500K), to suit any mood or task. The bulb is easily replaceable if needed.",
      "Minimalist Two-Tone Design – A sleek matte black base paired with a ribbed white shade, complementing Scandinavian, contemporary and modern home décor.",
      "Versatile Placement – Ideal as a bedside lamp, nightstand light or accent lamp for your bedroom, living room, office or entryway.",
      "Easy Plug-In and Energy Saving – Plugs into any standard Indian wall socket (220–240V) with no assembly needed. The energy-efficient LED bulb runs cool and lasts for years.",
      "Thoughtful Gift – A stylish, functional lighting piece that makes a considered gift for housewarmings, birthdays and festive occasions."
    ],
    inStock: true
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
