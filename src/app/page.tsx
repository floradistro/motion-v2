import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ProductShowcase from "@/components/ProductShowcase";
import Lifestyle from "@/components/Lifestyle";
import About from "@/components/About";
import ProductGallery from "@/components/ProductGallery";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StoreHydrator from "@/components/StoreHydrator";
import { getProducts, getProductReviews } from "@/lib/api";

export default async function Home() {
  const [products, reviews] = await Promise.all([
    getProducts(),
    getProductReviews(),
  ]);

  return (
    <>
      <StoreHydrator products={products} reviews={reviews} />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ProductShowcase />
        <Lifestyle />
        <About />
        <ProductGallery />
        <Science />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
