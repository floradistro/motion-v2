import type { Metadata } from "next";
import CheckoutContent from "@/components/CheckoutContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkout | MOTION",
  description: "Complete your MOTION order.",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CheckoutContent />
      <Footer />
    </>
  );
}
