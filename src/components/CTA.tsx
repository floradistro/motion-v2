"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/stores/product-store";

const HERO_BG =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/c46ef985-fb0a-48c4-9422-539342704a44.png";

export default function CTA() {
  const products = useProductStore((s) => s.products);

  const featured = products.find(
    (p) =>
      p.name.toLowerCase().includes("pouch") ||
      p.category?.slug === "pouches",
  );
  const tier = featured?.pricing_data?.tiers?.[0];

  const highlights =
    featured?.custom_fields?.highlights
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const stats: { val: string; label: string }[] = [];
  if (tier)
    stats.push({
      val: `$${tier.sale_price ?? tier.price}`,
      label: "per tin",
    });
  const hourMatch = highlights.find((h) => h.toLowerCase().includes("hour"));
  if (hourMatch) {
    const num = hourMatch.match(/(\d+\+?)/);
    stats.push({ val: num?.[1] || "6+", label: "hours" });
  }
  const nicotineMatch = highlights.find((h) =>
    h.toLowerCase().includes("nicotine"),
  );
  if (nicotineMatch) stats.push({ val: "0mg", label: "nicotine" });
  stats.push({ val: "Free", label: "shipping" });

  return (
    <section className="relative min-h-[600px] lg:min-h-[800px] overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="Motion products"
          fill
          unoptimized
          className="object-cover object-center"
          priority={false}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        {/* Extra vignette at edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] lg:min-h-[800px] px-4 sm:px-6 text-center">
        {/* Cyan label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-cyan-400 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          Ready to Move Different?
        </motion.p>

        {/* Giant heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-[120px] font-light text-white leading-[0.95] tracking-tight max-w-5xl mb-8"
        >
          Your edge is
          <br />
          <span className="text-gradient">one pouch away.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/70 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-lg mb-10"
        >
          Free shipping over $30. 30-day money-back guarantee.
          <br className="hidden sm:block" />
          Subscribe &amp; save 15% on every order.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-14"
        >
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 text-[13px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Shop Now</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 text-[13px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:border-white/60 hover:bg-white/5"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Floating product thumbnails */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-16"
          >
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] p-2 hover:border-cyan-400/30 transition-colors duration-300"
              >
                <Image
                  src={product.featured_image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-1.5"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom stats strip */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-6 sm:gap-10 lg:gap-14"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10 lg:gap-14">
                <div className="text-center">
                  <p className="text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-tight">
                    {s.val}
                  </p>
                  <p className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mt-1.5">
                    {s.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 sm:h-10 bg-white/[0.08]" />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
