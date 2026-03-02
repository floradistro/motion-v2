"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useProductStore } from "@/stores/product-store";
import { getAccent } from "@/lib/design-system";
import ModelViewer from "@/components/ModelViewer";
import type { Product } from "@/lib/api";

function AddToCartButton({ product }: { product: Product }) {
  const { addItem, loading } = useCart();
  const [added, setAdded] = useState(false);

  const tier = product.pricing_data?.tiers?.[0];
  if (!tier) return null;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addItem(product.id, tier.quantity, tier.id, tier.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full py-4 text-[12px] tracking-[0.2em] uppercase border font-medium transition-all duration-300 ${
        added
          ? "bg-cyan text-black border-cyan"
          : "bg-white/[0.04] border-white/10 text-white hover:bg-white hover:text-black"
      }`}
    >
      {loading ? "Adding..." : added ? "Added!" : "Add to Cart"}
    </button>
  );
}

export default function ProductShowcase() {
  const products = useProductStore((s) => s.products);

  return (
    <section id="shop" className="relative py-16 sm:py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-24"
        >
          <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
            The Lineup
          </p>
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white">
            Grab what you need.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {products.map((product, i) => {
            const accent = getAccent(product);
            const tier = product.pricing_data?.tiers?.[0];
            const bundleTier = product.pricing_data?.tiers?.[1];
            const modelUrl = product.custom_fields?.model_3d_url as
              | string
              | undefined;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group relative block bg-[#0a0a0a] border border-white/[0.04] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all duration-500"
                >
                  {product.featured && (
                    <div
                      className="absolute top-6 right-6 z-10 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      Fan Favorite
                    </div>
                  )}

                  <div className="relative aspect-[3/4] bg-[#070707] flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, ${accent}10 0%, transparent 70%)`,
                      }}
                    />

                    {modelUrl ? (
                      <div className="relative z-10 w-full h-full">
                        <ModelViewer src={modelUrl} alt={product.name} />
                        <div className="absolute bottom-3 left-3 text-[10px] text-white/40 tracking-wider uppercase pointer-events-none">
                          Drag to rotate
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <Image
                          src={product.featured_image}
                          alt={product.name}
                          width={500}
                          height={600}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain relative z-10 w-full max-h-[450px]"
                          style={{
                            filter: `drop-shadow(0 30px 60px ${accent}20)`,
                          }}
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-light text-white tracking-wide mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 mb-6">
                      {product.short_description || product.description}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      {tier && (
                        <span className="text-2xl font-light text-white">
                          ${tier.price}
                        </span>
                      )}
                      {bundleTier && (
                        <span className="text-[11px] tracking-wider text-cyan/70 uppercase">
                          {bundleTier.label} ${bundleTier.price}
                        </span>
                      )}
                    </div>

                    <AddToCartButton product={product} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-block px-10 py-4 text-[12px] tracking-[0.2em] uppercase border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
