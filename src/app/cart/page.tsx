import type { Metadata } from "next";
import CartContent from "@/components/CartContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cart | MOTION",
  description: "Review your MOTION products before checkout.",
};

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartContent />
      <Footer />
    </>
  );
}
