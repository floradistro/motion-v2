import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import ShopContent from "@/components/ShopContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreHydrator from "@/components/StoreHydrator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://motionpouches.com";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Engineered for the elite. Experience sustained focus, razor-sharp clarity, and clean energy with MOTION nootropic pouches.",
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: "Shop MOTION Pouches",
    description:
      "Premium nootropic pouches for peak performance. Zero nicotine, zero sugar, zero compromise.",
    url: `${SITE_URL}/shop`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Shop MOTION")}&tagline=${encodeURIComponent("Premium nootropic pouches engineered for peak performance")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop MOTION | Move Different",
    description:
      "Premium nootropic pouches for peak performance. Zero nicotine, zero sugar, zero compromise.",
  },
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <StoreHydrator products={products} />
      <Navbar />
      <ShopContent />
      <Footer />
    </>
  );
}
