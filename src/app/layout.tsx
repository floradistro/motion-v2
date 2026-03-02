import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import AuthInitializer from "@/components/AuthInitializer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOTION | Move Different",
  description:
    "Premium nootropic pouches engineered for peak performance. Clean focus, zero compromise.",
  keywords: [
    "nootropic pouches",
    "focus",
    "performance",
    "clean energy",
    "no nicotine",
  ],
  openGraph: {
    title: "MOTION | Move Different",
    description:
      "Premium nootropic pouches engineered for peak performance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          <AuthInitializer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
