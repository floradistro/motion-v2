"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api";

function getAccent(product: Product): string {
  return product.custom_fields?.flavor_color || "#22d3ee";
}

export default function ShopContent({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("all");

  // Derive categories from product data — no hardcoding
  const categories = useMemo(() => {
    const seen = new Map<string, { slug: string; name: string; count: number }>();
    for (const p of products) {
      if (p.category) {
        const existing = seen.get(p.category.slug);
        if (existing) {
          existing.count++;
        } else {
          seen.set(p.category.slug, {
            slug: p.category.slug,
            name: p.category.name,
            count: 1,
          });
        }
      }
    }
    return Array.from(seen.values());
  }, [products]);

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category?.slug === filter);

  return (
    <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 lg:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
            Shop
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-white mb-6">
            Unlock Your Peak Performance.
          </h1>
          <p className="text-lg text-muted/60 font-light max-w-2xl mx-auto">
            Engineered for the elite. Experience sustained focus, razor-sharp
            clarity, and clean energy. Optimize your cognitive output.
          </p>
        </motion.div>

        {/* Category filters — derived from product data */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-14"
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 text-[12px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                filter === "all"
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setFilter(cat.slug)}
                className={`px-6 py-3 text-[12px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                  filter === cat.slug
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* Count */}
        <motion.p
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted/40 mt-6 font-light"
        >
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product, i) => {
            const accent = getAccent(product);
            const tier = product.pricing_data?.tiers?.[0];
            const comparePrice = product.custom_fields?.compare_price;
            const bundleTier = product.pricing_data?.tiers?.[1];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group block relative bg-[#0a0a0a] border border-white/[0.04] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
                >
                  {product.featured && (
                    <div
                      className="absolute top-5 right-5 z-10 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      Fan Favorite
                    </div>
                  )}

                  {product.custom_fields?.badge && (
                    <div className="absolute top-5 left-5 z-10 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-muted/60 bg-white/[0.04] border border-white/[0.06]">
                      {product.custom_fields.badge}
                    </div>
                  )}

                  <div className="relative aspect-[3/4] bg-[#070707] flex items-center justify-center p-6 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${accent}15 0%, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                      <Image
                        src={product.featured_image}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="object-contain w-full max-h-[380px]"
                        style={{
                          filter: `drop-shadow(0 25px 50px ${accent}25)`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-7">
                    {product.custom_fields?.flavor && (
                      <p
                        className="text-[11px] tracking-[0.2em] uppercase mb-2 font-medium"
                        style={{ color: accent }}
                      >
                        {product.custom_fields.flavor}
                      </p>
                    )}
                    <h3 className="text-lg font-light text-white tracking-wide mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-muted/50 leading-relaxed line-clamp-2 mb-5">
                      {product.custom_fields?.tagline ||
                        product.short_description}
                    </p>

                    <div className="flex items-baseline gap-3 mb-5">
                      {tier && (
                        <span className="text-2xl font-light text-white">
                          ${tier.sale_price ?? tier.price}
                        </span>
                      )}
                      {tier?.sale_price && tier?.regular_price && tier.regular_price > tier.sale_price ? (
                        <span className="text-sm text-muted/30 line-through">
                          ${tier.regular_price}
                        </span>
                      ) : (
                        comparePrice &&
                        tier &&
                        comparePrice > tier.price && (
                          <span className="text-sm text-muted/30 line-through">
                            ${comparePrice}
                          </span>
                        )
                      )}
                      {bundleTier && (
                        <span className="text-[11px] tracking-wider text-cyan/60 uppercase ml-auto">
                          {bundleTier.label} ${bundleTier.sale_price ?? bundleTier.price}
                        </span>
                      )}
                    </div>

                    <div className="w-full py-3.5 text-[12px] tracking-[0.2em] uppercase bg-white/[0.04] border border-white/10 text-white text-center group-hover:bg-white group-hover:text-black transition-all duration-300 font-medium">
                      View Product
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
