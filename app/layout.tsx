import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voltlabs.in"),
  title: {
    default: "VoltLabs | Smart Home IoT Products India - Touch Lamps & RGB Lights",
    template: "%s | VoltLabs",
  },
  description: "Buy premium smart touch lamps, RGB lights & table lamps online at affordable prices. VoltLabs offers WiFi-connected smart home products with app control, 1-year warranty & free shipping in India.",
  keywords: [
    "smart lamp India",
    "RGB touch lamp",
    "smart table lamp",
    "WiFi lamp",
    "touch lamp online",
    "smart home products India",
    "IoT lamp",
    "VoltLabs",
    "decorative lamp",
    "bedroom lamp",
    "RGB LED lamp",
    "app controlled lamp",
    "smart lighting India",
    "affordable smart lamp",
    "table lamp with touch",
  ],
  authors: [{ name: "VoltLabs", url: "https://voltlabs.in" }],
  creator: "VoltLabs",
  publisher: "VoltLabs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "VoltLabs | Smart Touch Lamps & RGB Lights - Shop Online India",
    description: "Premium WiFi-connected smart touch lamps starting ₹799. App control, 16M+ colors, 1-year warranty. Free shipping across India. Shop now on Amazon!",
    url: "https://voltlabs.in",
    siteName: "VoltLabs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoltLabs Smart Touch Lamps - Transform Your Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltLabs | Smart Touch Lamps & RGB Lights India",
    description: "Premium WiFi-connected smart lamps starting ₹799. App control, 16M+ colors, 1-year warranty. Free shipping!",
    images: ["/og-image.png"],
    creator: "@voltlabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://voltlabs.in",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
