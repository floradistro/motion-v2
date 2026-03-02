import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getProductBySlug } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreHydrator from "@/components/StoreHydrator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://motionpouches.com";

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
  if (!product) return { title: "Product Not Found" };

  const price = product.pricing_data?.tiers?.find((t) => t.enabled)?.price;
  const description = product.short_description || product.description;
  const title = product.name;
  const url = `${SITE_URL}/shop/${product.slug}`;
  const images = [
    {
      url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&price=${price || ""}&image=${encodeURIComponent(product.featured_image)}&tagline=${encodeURIComponent(product.custom_fields?.tagline || "")}&slug=${encodeURIComponent(product.slug)}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "MOTION",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MOTION`,
      description,
      images,
    },
  };
}

function ProductJsonLd({ product }: { product: { name: string; slug: string; description: string; short_description?: string; featured_image: string; sku: string; pricing_data: { tiers: { enabled: boolean; price: number; sale_price?: number }[] }; custom_fields?: { highlights?: string }; availability?: { in_stock: boolean }[] } }) {
  const price = product.pricing_data?.tiers?.find((t) => t.enabled);
  const inStock = product.availability?.some((a) => a.in_stock) !== false;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description || product.description,
    image: product.featured_image,
    sku: product.sku,
    url: `${SITE_URL}/shop/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "MOTION",
    },
    offers: {
      "@type": "Offer",
      price: price?.sale_price ?? price?.price ?? 0,
      priceCurrency: "USD",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/shop/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "MOTION",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
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
      <ProductJsonLd product={product} />
      <StoreHydrator products={allProducts} />
      <Navbar />
      <ProductDetail product={product} related={related} />
      <Footer />
    </>
  );
}
