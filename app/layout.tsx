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
  title: "VoltLabs | Smart IoT Hardware Solutions",
  description: "VoltLabs designs and manufactures innovative IoT hardware devices that power the connected world. From smart sensors to industrial automation, we build the future of connected technology.",
  keywords: ["VoltLabs", "IoT", "hardware", "smart devices", "sensors", "embedded systems", "industrial IoT", "connected devices"],
  authors: [{ name: "VoltLabs" }],
  openGraph: {
    title: "VoltLabs | Smart IoT Hardware Solutions",
    description: "Designing innovative IoT hardware that powers the connected world",
    type: "website",
  },
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
