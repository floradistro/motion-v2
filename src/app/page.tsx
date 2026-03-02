import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ProductShowcase from "@/components/ProductShowcase";
import Lifestyle from "@/components/Lifestyle";
import ProductGallery from "@/components/ProductGallery";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getProducts, getProductReviews } from "@/lib/api";

export default async function Home() {
  const [products, reviews] = await Promise.all([
    getProducts(),
    getProductReviews(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ProductShowcase products={products} />
        <Lifestyle />
        <ProductGallery />
        <Science />
        <Testimonials reviews={reviews} />
        <CTA products={products} />
      </main>
      <Footer />
    </>
  );
}
