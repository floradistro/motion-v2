"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/stores/product-store";

export default function CTA() {
  const products = useProductStore((s) => s.products);

  const pouch = products.find(
    (p) =>
      p.name.toLowerCase().includes("pouch") ||
      p.category?.slug === "pouches",
  );
  const other = products.find((p) => p.id !== pouch?.id);

  const featured = pouch || products[0];
  const secondary = other || products[1];

  const tier = featured?.pricing_data?.tiers?.[0];
  const highlights =
    featured?.custom_fields?.highlights
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const stats: { val: string; sub: string }[] = [];
  if (tier) stats.push({ val: `$${tier.sale_price ?? tier.price}`, sub: `per ${tier.unit}` });
  const hourMatch = highlights.find((h) => h.toLowerCase().includes("hour"));
  if (hourMatch) {
    const num = hourMatch.match(/(\d+\+?)/);
    stats.push({ val: num?.[1] || "6+", sub: "hours" });
  }
  const nicotineMatch = highlights.find((h) =>
    h.toLowerCase().includes("nicotine"),
  );
  if (nicotineMatch) stats.push({ val: "0", sub: "nicotine" });
  stats.push({ val: "Free", sub: "shipping $30+" });

  if (!featured) return null;

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#060606]">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_60%)] aurora-orb" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.05)_0%,transparent_60%)] aurora-orb-2" />
          </div>

          <div className="absolute inset-0 border border-white/[0.04] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[650px] lg:min-h-[750px]">
            <div className="relative flex items-center justify-center py-20 lg:py-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex items-end gap-6 lg:gap-8"
              >
                {featured && (
                  <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, -1.5, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={featured.featured_image}
                      alt={featured.name}
                      width={420}
                      height={420}
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                      className="object-contain w-[240px] sm:w-[320px] lg:w-[400px]"
                      style={{
                        filter: `drop-shadow(0 40px 80px ${featured.custom_fields?.flavor_color || "#22d3ee"}30)`,
                      }}
                    />
                  </motion.div>
                )}
                {secondary && (
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  >
                    <Image
                      src={secondary.featured_image}
                      alt={secondary.name}
                      width={340}
                      height={420}
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 320px"
                      className="object-contain w-[200px] sm:w-[260px] lg:w-[320px]"
                      style={{
                        filter: `drop-shadow(0 40px 80px ${secondary.custom_fields?.flavor_color || "#22d3ee"}25)`,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="flex items-center px-6 sm:px-10 lg:px-20 py-20 lg:py-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl lg:text-7xl font-extralight tracking-tight text-white leading-[0.95] mb-10">
                  Still thinking
                  <br />
                  <span className="text-gradient font-light">about it?</span>
                </h2>

                <p className="text-muted text-lg lg:text-xl font-light leading-relaxed mb-12 max-w-md">
                  Free shipping over $30. 30-day money-back guarantee.
                  Subscribe & save 15%.
                </p>

                <div className="flex flex-wrap items-center gap-5 mb-14">
                  <Link
                    href="/shop"
                    className="group relative inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-[13px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] btn-press"
                  >
                    <span className="relative z-10">Let&apos;s Go</span>
                    <svg
                      className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {stats.length > 0 && (
                  <div className="flex flex-wrap items-center gap-8 lg:gap-10">
                    {stats.slice(0, 4).map((s, i) => (
                      <div key={s.sub} className="flex items-center gap-8 lg:gap-10">
                        <div className="text-center">
                          <p className="text-white text-2xl lg:text-3xl font-light number-glow">
                            {s.val}
                          </p>
                          <p className="text-[10px] text-muted/40 mt-2 uppercase tracking-[0.2em]">
                            {s.sub}
                          </p>
                        </div>
                        {i < Math.min(stats.length, 4) - 1 && (
                          <div className="w-[1px] h-10 bg-white/[0.05]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
