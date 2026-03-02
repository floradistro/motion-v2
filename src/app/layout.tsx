import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import AuthInitializer from "@/components/AuthInitializer";
import TelemetryProvider from "@/components/TelemetryProvider";
import PageTransition from "@/components/ui/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://motionpouches.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MOTION | Move Different",
    template: "%s | MOTION",
  },
  description:
    "Premium nootropic pouches engineered for peak performance. Clean focus, zero compromise.",
  keywords: [
    "nootropic pouches",
    "focus pouches",
    "nootropic",
    "focus",
    "performance",
    "clean energy",
    "no nicotine",
    "nicotine free pouches",
    "cognitive enhancement",
    "brain supplement",
    "MOTION pouches",
  ],
  authors: [{ name: "MOTION" }],
  creator: "MOTION",
  publisher: "MOTION",
  openGraph: {
    type: "website",
    siteName: "MOTION",
    title: "MOTION | Move Different",
    description:
      "Premium nootropic pouches engineered for peak performance. Clean focus, zero compromise.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOTION | Move Different",
    description:
      "Premium nootropic pouches engineered for peak performance.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <TelemetryProvider>
          <CartProvider>
            <AuthInitializer />
            <CartDrawer />
            <PageTransition>
              {children}
            </PageTransition>
          </CartProvider>
        </TelemetryProvider>
      </body>
    </html>
  );
}
