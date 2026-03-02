import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getProductBySlug } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | MOTION" };
  return {
    title: `${product.name} | MOTION`,
    description: product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.short_description || product.description,
      images: [{ url: product.featured_image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <ProductDetail product={product} related={related} />
      <Footer />
    </>
  );
}
