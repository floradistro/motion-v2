"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import ModelViewer from "@/components/ModelViewer";
import { Molecule, molecules, ingredients } from "@/lib/molecules";
import ReviewCarousel from "@/components/ReviewCarousel";
import type { Product, PricingTier } from "@/lib/api";

/* ─── Helpers ────────────────────────────────────────── */

function getAccent(product: Product): string {
  return product.custom_fields?.flavor_color || "#22d3ee";
}

function parseBenefits(
  product: Product,
): { title: string; description: string }[] {
  try {
    if (product.custom_fields?.benefits) {
      return JSON.parse(product.custom_fields.benefits);
    }
  } catch {
    /* ignore */
  }
  return [];
}

function parseHighlights(product: Product): string[] {
  const h = product.custom_fields?.highlights;
  if (!h) return [];
  return h
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ─── Hero lifestyle images per product ─────────────── */

const LIFESTYLE_HEROES: [string, string, string][] = [
  // [slug-prefix, image-url, tagline]
  ["mint-pouches", "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/ab695158-1a3a-4bb6-ae4a-ea729a5bb90e.jpg", "Built for the start line."],
  ["mango-pouches", "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/477cd688-5eab-4b94-a2ad-0ec725e15053.jpg", "Hit different."],
  ["blue-raspberry-pouches", "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/1808c5a9-d04b-4f42-bbea-8c1fb8b84069.jpg", "Move through everything."],
  ["limitless-capsules", "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/a4412aaa-645f-451d-ac45-4a7a960fe92f.jpg", "Precision at the highest level."],
];

function getLifestyleHero(slug: string): { src: string; tagline: string } | null {
  const match = LIFESTYLE_HEROES.find(([prefix]) => slug.startsWith(prefix));
  return match ? { src: match[1], tagline: match[2] } : null;
}

/* ─── Animated counter for benefit numbers ───────────── */

function AnimatedIndex({ n, accent }: { n: number; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[14px] font-medium"
      style={{
        backgroundColor: `${accent}12`,
        color: accent,
        border: `1px solid ${accent}20`,
      }}
    >
      {n}
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────── */

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const accent = getAccent(product);
  const benefits = parseBenefits(product);
  const highlights = parseHighlights(product);
  const tiers = product.pricing_data?.tiers?.filter((t) => t.enabled) || [];
  const lifestyleHero = getLifestyleHero(product.slug);
  const allImages = [product.featured_image, ...(product.image_gallery || [])];

  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    tiers[0] || {
      id: "",
      unit: "",
      label: "",
      price: 0,
      enabled: true,
      quantity: 1,
    },
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [descTab, setDescTab] = useState<"description" | "ingredients" | "usage">("description");
  const modelUrl = product.custom_fields?.model_3d_url as string | undefined;
  const [galleryView, setGalleryView] = useState<"3d" | "photos">(
    modelUrl ? "3d" : "photos",
  );
  const { addItem, loading } = useCart();

  const handleAddToCart = async () => {
    await addItem(
      product.id,
      1,
      selectedTier.id,
      selectedTier.sale_price ?? selectedTier.price,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const comparePrice = product.custom_fields?.compare_price;
  const longDesc =
    product.custom_fields?.long_description || product.description;
  const usage = product.custom_fields?.usage_instructions;

  return (
    <main className="min-h-screen bg-background pt-28 lg:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Breadcrumb ───────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[12px] text-muted/40 mb-12">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-muted/20">/</span>
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <span className="text-muted/20">/</span>
          <span className="text-muted/60">{product.name}</span>
        </nav>

        {/* ── Product Hero ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* View toggle: 3D View / Photos */}
            {modelUrl && (
              <div className="flex gap-1 mb-3">
                {(["3d", "photos"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setGalleryView(view)}
                    className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium border transition-all duration-300 ${
                      galleryView === view
                        ? "bg-white/[0.06] border-white/15 text-white"
                        : "bg-transparent border-white/[0.04] text-muted/40 hover:text-muted/70 hover:border-white/[0.08]"
                    }`}
                  >
                    {view === "3d" ? "3D View" : "Photos"}
                  </button>
                ))}
              </div>
            )}

            {/* Main display area */}
            {galleryView === "3d" && modelUrl ? (
              <div className="relative aspect-square bg-[#070707] border border-white/[0.04] overflow-hidden">
                <ModelViewer
                  src={modelUrl}
                  alt={product.name}
                  autoRotate
                  cameraControls
                />
                <div className="absolute bottom-4 left-4 text-[10px] text-muted/30 tracking-wider uppercase pointer-events-none">
                  Drag to rotate
                </div>
              </div>
            ) : (
              <>
                {/* Main Image */}
                <div className="relative aspect-square bg-[#080808] border border-white/[0.04] overflow-hidden group">
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                    style={{
                      background: `radial-gradient(ellipse at 50% 60%, ${accent}10 0%, transparent 65%)`,
                    }}
                  />

                  {/* Floor reflection */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] blur-sm opacity-20"
                    style={{ backgroundColor: accent }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full h-full flex items-center justify-center p-10 lg:p-14"
                    >
                      <Image
                        src={allImages[selectedImage]}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{
                          filter: `drop-shadow(0 30px 50px ${accent}18)`,
                        }}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.15em] text-muted/30 font-mono">
                      {selectedImage + 1}/{allImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-[72px] h-[72px] flex-shrink-0 bg-[#080808] border overflow-hidden transition-all duration-400 ${
                          selectedImage === i
                            ? "border-white/25 bg-white/[0.03]"
                            : "border-white/[0.04] hover:border-white/10"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          width={72}
                          height={72}
                          className="object-contain w-full h-full p-2"
                        />
                        {/* Active indicator bar */}
                        {selectedImage === i && (
                          <motion.div
                            layoutId="thumb-indicator"
                            className="absolute bottom-0 left-0 right-0 h-[2px]"
                            style={{ backgroundColor: accent }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            {/* Category + Badge */}
            <div className="flex items-center gap-3 mb-5">
              {product.category && (
                <span className="text-[11px] tracking-[0.25em] uppercase text-muted/40">
                  {product.category.name}
                </span>
              )}
              {product.custom_fields?.badge && (
                <span
                  className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-medium"
                  style={{
                    backgroundColor: `${accent}10`,
                    color: accent,
                    border: `1px solid ${accent}18`,
                  }}
                >
                  {product.custom_fields.badge}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extralight tracking-tight text-white leading-[1.05] mb-4">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.custom_fields?.tagline && (
              <p className="text-[15px] text-muted/45 font-light mb-10 max-w-md leading-relaxed">
                {product.custom_fields.tagline}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-10">
              <span
                className="text-4xl lg:text-5xl font-light"
                style={{ color: "white" }}
              >
                ${selectedTier.sale_price ?? selectedTier.price}
              </span>
              {selectedTier.sale_price && selectedTier.regular_price && selectedTier.regular_price > selectedTier.sale_price ? (
                <span className="text-lg text-muted/25 line-through">
                  ${selectedTier.regular_price}
                </span>
              ) : (
                comparePrice &&
                selectedTier.quantity === 1 &&
                comparePrice > selectedTier.price && (
                  <span className="text-lg text-muted/25 line-through">
                    ${comparePrice}
                  </span>
                )
              )}
              {selectedTier.sale_price && selectedTier.regular_price && (
                <span className="text-[11px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 bg-cyan/10 text-cyan border border-cyan/20">
                  Save {Math.round(((selectedTier.regular_price - selectedTier.sale_price) / selectedTier.regular_price) * 100)}%
                </span>
              )}
              <span className="text-[11px] tracking-[0.2em] text-muted/35 uppercase">
                / {selectedTier.label}
              </span>
            </div>

            {/* Tier selector */}
            {tiers.length > 1 && (
              <div className="mb-10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-4 font-medium">
                  Select Size
                </p>
                <div className="flex gap-3">
                  {tiers.map((tier) => {
                    const active = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`relative flex-1 py-4 px-5 border transition-all duration-400 text-left overflow-hidden ${
                          active
                            ? "border-white/20 bg-white/[0.06]"
                            : "border-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        {/* Active left accent bar */}
                        {active && (
                          <motion.div
                            layoutId="tier-accent"
                            className="absolute left-0 top-0 bottom-0 w-[2px]"
                            style={{ backgroundColor: accent }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <span className="relative block text-white text-sm font-medium">
                          {tier.label}
                        </span>
                        <span className="relative block text-muted/45 text-[13px] mt-1">
                          ${tier.sale_price ?? tier.price}
                          {tier.sale_price && tier.regular_price && (
                            <span className="text-muted/25 line-through ml-1.5">
                              ${tier.regular_price}
                            </span>
                          )}
                          {tier.quantity > 1 && (
                            <span className="text-muted/25">
                              {" "}
                              / {tier.quantity} {tier.unit}
                            </span>
                          )}
                        </span>
                        {/* Active indicator */}
                        {active && (
                          <motion.div
                            layoutId="tier-indicator"
                            className="absolute bottom-0 left-0 right-0 h-[2px]"
                            style={{ backgroundColor: accent }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="relative w-full py-5 text-[13px] tracking-[0.25em] uppercase font-medium transition-all duration-400 overflow-hidden group btn-press"
              style={{
                backgroundColor: added ? accent : "white",
                color: added ? "#000" : "#000",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${accent}15, 0 0 30px ${accent}10`,
                }}
              />
              <span className="relative z-10">
                {loading
                  ? "Adding..."
                  : added
                    ? "\u2713 Added to Cart"
                    : "Add to Cart"}
              </span>
            </motion.button>

            <Link
              href="/cart"
              className="block w-full py-4 mt-3 text-[11px] tracking-[0.2em] uppercase text-center border border-white/[0.06] text-muted/60 hover:text-white hover:border-white/20 transition-all duration-400"
            >
              View Cart
            </Link>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3 text-[13px] text-muted/55 font-light"
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: accent }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {h}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Lifestyle Hero ─────────────────────────────── */}
        {lifestyleHero && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="mt-28 lg:mt-40 -mx-6 lg:-mx-12 relative overflow-hidden"
          >
            <div className="relative h-[70vh] lg:h-[85vh] min-h-[500px]">
              {/* Full-bleed image */}
              <Image
                src={lifestyleHero.src}
                alt="Motion lifestyle"
                fill
                sizes="100vw"
                className="object-cover"
                priority={false}
              />

              {/* Gradient overlays — cinematic treatment */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />

              {/* Top — Motion logo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-8 lg:top-12 left-6 lg:left-12"
              >
                <Image
                  src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/vendor-logos/motion-pouches/logo.png"
                  alt="MOTION"
                  width={100}
                  height={40}
                  className="h-8 lg:h-10 w-auto opacity-80"
                />
              </motion.div>

              {/* Top right — accent label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-8 lg:top-12 right-6 lg:right-12"
              >
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-2"
                  style={{
                    backgroundColor: `${accent}12`,
                    color: accent,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  Move Different
                </span>
              </motion.div>

              {/* Center-bottom — main tagline */}
              <div className="absolute bottom-14 lg:bottom-24 left-6 lg:left-12 right-6 lg:right-12">
                {/* Accent line above tagline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-[2px] mb-6 lg:mb-8"
                  style={{ backgroundColor: accent }}
                />

                {/* Large tagline */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-extralight tracking-tight text-white leading-[0.95] max-w-4xl"
                >
                  {lifestyleHero.tagline}
                </motion.h2>

                {/* Subtitle + product name */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-4 mt-6 lg:mt-8"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-white/50 font-light">
                    {product.name}
                  </span>
                  <span className="text-white/15 text-[12px]">/</span>
                  <span className="text-[12px] tracking-[0.2em] uppercase text-white/30 font-light">
                    Zero nicotine
                  </span>
                  <span className="text-white/15 text-[12px]">/</span>
                  <span className="text-[12px] tracking-[0.2em] uppercase text-white/30 font-light">
                    Clean focus
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Details section ──────────────────────────────── */}
        <div className="mt-28 lg:mt-40">
          <div className="section-divider mb-20 lg:mb-28" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Description — Tabbed interface */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tab bar */}
              <div className="flex gap-1 mb-8">
                {([
                  ["description", "Description"],
                  ["ingredients", "Ingredients"],
                  ["usage", "How to Use"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setDescTab(key)}
                    className={`relative px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium border transition-all duration-300 ${
                      descTab === key
                        ? "bg-white/[0.06] border-white/15 text-white"
                        : "bg-transparent border-white/[0.04] text-muted/40 hover:text-muted/70 hover:border-white/[0.08]"
                    }`}
                  >
                    {label}
                    {descTab === key && (
                      <motion.div
                        layoutId="desc-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: accent }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {descTab === "description" && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Key facts card */}
                    {(product.custom_fields?.serving_size || highlights.length > 0) && (
                      <div className="p-6 bg-white/[0.02] border border-white/[0.04] mb-8">
                        {product.custom_fields?.serving_size && (
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-muted/35 font-medium">Serving Size</span>
                            <span className="text-[13px] text-white/70 font-light">{product.custom_fields.serving_size}</span>
                          </div>
                        )}
                        {highlights.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-2">
                            {highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-[11px] tracking-[0.1em] px-3 py-1.5 font-light"
                                style={{
                                  backgroundColor: `${accent}08`,
                                  color: `${accent}cc`,
                                  border: `1px solid ${accent}15`,
                                }}
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description paragraphs */}
                    {longDesc && (
                      <div className="space-y-4">
                        {longDesc.split("\n\n").map((para, i) => (
                          <p
                            key={i}
                            className={`font-light leading-[1.85] ${
                              i === 0
                                ? "text-[16px] text-muted/65"
                                : "text-[15px] text-muted/50"
                            }`}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {descTab === "ingredients" && (
                  <motion.div
                    key="ing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="divide-y divide-white/[0.04]">
                      {ingredients.map((ing) => (
                        <div key={ing.name} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                          {/* Mini molecule SVG */}
                          <div className="w-10 h-10 flex-shrink-0 opacity-50">
                            <Molecule
                              data={molecules[ing.molecule]}
                              id={`tab-${ing.molecule}`}
                              accentOverride={accent}
                              className="w-full h-full"
                            />
                          </div>
                          {/* Name + formula */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] text-white font-light">{ing.name}</p>
                            <p className="text-[10px] text-muted/25 font-mono tracking-wider">{ing.formula}</p>
                          </div>
                          {/* Dose */}
                          <span
                            className="text-[13px] tracking-[0.1em] font-mono flex-shrink-0"
                            style={{ color: `${accent}cc` }}
                          >
                            {ing.dose}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {descTab === "usage" && (
                  <motion.div
                    key="use"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-8 glass-strong relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
                        style={{ backgroundColor: accent }}
                      />
                      <h3 className="text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-4 font-medium">
                        Usage Instructions
                      </h3>
                      <p className="text-[14px] text-muted/55 font-light leading-[1.8]">
                        {usage || "Follow the suggested serving size on the packaging. Consult your healthcare provider if you have any concerns."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Benefits */}
            {benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <h2 className="text-[11px] tracking-[0.3em] uppercase text-muted/50 font-medium">
                    Benefits
                  </h2>
                </div>

                <div className="space-y-4">
                  {benefits.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative p-6 lg:p-8 bg-white/[0.015] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 card-shimmer overflow-hidden"
                    >
                      {/* Hover accent line */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: accent }}
                      />

                      <div className="flex items-start gap-5">
                        <AnimatedIndex n={i + 1} accent={accent} />
                        <div className="pt-1">
                          <h3 className="text-white text-[15px] font-medium mb-2 tracking-wide">
                            {b.title}
                          </h3>
                          <p className="text-[13px] text-muted/45 font-light leading-relaxed">
                            {b.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── What's Inside — Molecule Section ────────────── */}
        <section className="mt-28 lg:mt-40">
          <div className="section-divider mb-20 lg:mb-28" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-24"
          >
            <p
              className="text-[13px] tracking-[0.4em] uppercase mb-6"
              style={{ color: accent }}
            >
              The Formula
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-white">
              What&apos;s inside.
            </h2>
          </motion.div>

          {/* Featured molecule — large hero display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-6 overflow-hidden"
          >
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/[0.015] border border-white/[0.04]">
              {/* Left — large molecule render */}
              <div className="relative flex items-center justify-center py-16 lg:py-24 px-8 overflow-hidden">
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${accent}12 0%, transparent 70%)`,
                  }}
                />

                {/* Large background molecule */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                  <Molecule
                    data={molecules.caffeine}
                    id="hero-bg"
                    className="w-[600px] h-[500px]"
                  />
                </div>

                {/* Foreground molecule */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-[320px] lg:max-w-[400px]"
                >
                  <Molecule
                    data={molecules.caffeine}
                    id="hero-main"
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              {/* Right — content */}
              <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-white/[0.04]">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: `${accent}10`,
                      color: accent,
                      border: `1px solid ${accent}18`,
                    }}
                  >
                    Primary
                  </span>
                  <span className="text-[11px] text-muted/30 font-mono tracking-wider">
                    C\u2088H\u2081\u2080N\u2084O\u2082
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-3">
                  Caffeine + L-Theanine
                </h3>
                <p className="text-[14px] text-muted/40 font-light mb-8 leading-relaxed max-w-md">
                  The 1:2 ratio that started it all. Clean energy without the
                  crash. Caffeine locks you in while Theanine smooths out the
                  edges.
                </p>

                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-light text-white number-glow">
                      100mg
                    </p>
                    <p className="text-[10px] text-muted/30 mt-1 uppercase tracking-[0.2em]">
                      Caffeine
                    </p>
                  </div>
                  <div className="w-[1px] bg-white/[0.05]" />
                  <div>
                    <p className="text-2xl font-light text-white number-glow">
                      200mg
                    </p>
                    <p className="text-[10px] text-muted/30 mt-1 uppercase tracking-[0.2em]">
                      L-Theanine
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ingredient grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04]">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-8 lg:p-10 group hover:bg-surface transition-colors duration-500 relative overflow-hidden"
              >
                {/* Background decorative molecule */}
                <div className="absolute -top-2 -right-2 w-[140px] h-[120px] lg:w-[160px] lg:h-[130px] opacity-[0.025] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                  <Molecule
                    data={molecules[ing.molecule]}
                    id={`pd-bg-${ing.molecule}`}
                    className="w-full h-full"
                  />
                </div>

                {/* Inline molecule */}
                <div className="h-16 lg:h-20 mb-5 flex items-center">
                  <div className="opacity-40 group-hover:opacity-80 transition-opacity duration-500 w-full max-w-[140px] lg:max-w-[180px] h-full">
                    <Molecule
                      data={molecules[ing.molecule]}
                      id={`pd-${ing.molecule}`}
                      accentOverride={accent}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Data */}
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-base lg:text-lg font-light text-white">
                    {ing.name}
                  </h3>
                  <span
                    className="text-[12px] tracking-[0.1em] font-mono"
                    style={{ color: `${accent}cc` }}
                  >
                    {ing.dose}
                  </span>
                </div>
                <p className="text-[10px] text-muted/25 font-mono tracking-wider mb-3">
                  {ing.formula}
                </p>
                <p className="text-[13px] text-muted/50 font-light leading-relaxed">
                  {ing.benefit}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ backgroundColor: accent }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Reviews ────────────────────────────────────── */}
        <section className="mt-28 lg:mt-40">
          <div className="section-divider mb-20 lg:mb-28" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-24"
          >
            <p
              className="text-[13px] tracking-[0.4em] uppercase mb-6"
              style={{ color: accent }}
            >
              Reviews
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-white">
              What people think.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ReviewCarousel
              productSlug={product.slug}
              productId={product.id}
              accent={accent}
            />
          </motion.div>
        </section>

        {/* ── Related Products ────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-28 lg:mt-40">
            <div className="section-divider mb-16 lg:mb-20" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight text-white">
                You might also like
              </h2>
              <Link
                href="/shop"
                className="text-[11px] tracking-[0.2em] uppercase text-muted/40 hover:text-cyan transition-colors duration-300"
              >
                View All
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => {
                const relAccent = getAccent(p);
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/shop/${p.slug}`}
                      className="group block bg-[#080808] border border-white/[0.04] overflow-hidden hover:border-white/[0.1] transition-all duration-500 card-lift"
                    >
                      <div className="relative aspect-[4/3] bg-[#060606] flex items-center justify-center p-10 overflow-hidden">
                        {/* Ambient glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(ellipse at 50% 60%, ${relAccent}08 0%, transparent 65%)`,
                          }}
                        />
                        <Image
                          src={p.featured_image}
                          alt={p.name}
                          width={300}
                          height={300}
                          className="object-contain relative z-10 w-full max-h-[200px] transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{
                            filter: `drop-shadow(0 20px 40px ${relAccent}15)`,
                          }}
                        />
                      </div>
                      <div className="p-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-[15px] font-light text-white tracking-wide">
                            {p.name}
                          </h3>
                          {p.custom_fields?.tagline && (
                            <p className="text-[12px] text-muted/35 mt-1 font-light">
                              {p.custom_fields.tagline}
                            </p>
                          )}
                        </div>
                        <span className="text-lg font-light text-white">
                          ${p.pricing_data?.tiers?.[0]?.sale_price ?? p.pricing_data?.tiers?.[0]?.price ?? 0}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
