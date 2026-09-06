import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Variable font, so the whole 200-1000 weight range comes in one file and
// every font-medium/semibold/bold/extrabold on the site is covered.
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
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
  category: "Electronics",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e13" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning: the inline script below adds the `dark` class
       to <html> before React hydrates, so this one element legitimately
       differs from the server-rendered markup. */
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${nunitoSans.variable} antialiased font-sans`}
      >
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QQX3CJPMW7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QQX3CJPMW7');
          `}
        </Script>
      </body>
    </html>
  );
}
