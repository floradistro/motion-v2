import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import ShopContent from "@/components/ShopContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreHydrator from "@/components/StoreHydrator";

export const metadata: Metadata = {
  title: "Shop | MOTION",
  description:
    "Engineered for the elite. Experience sustained focus, razor-sharp clarity, and clean energy.",
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
