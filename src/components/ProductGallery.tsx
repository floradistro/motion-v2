"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const POUCH_CLOSEUP_1 =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/d8be7ebe-664d-4fdc-b4cf-e9966b5992b8.png";
const POUCH_CLOSEUP_2 =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/products/pouches-all-flavors/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/ffc7b1b5-ce41-4320-9abb-be8f4b7b35e9-freepik-pouch-closeup-2.png";
const POUCH_PILE =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/products/pouches-all-flavors/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/6b7639d1-3d45-4262-b1f9-a63b8fd600a9-freepik-pouch-pile.png";
const CAPSULES_1 =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/capsules/capsules-1.webp";
const CAPSULES_2 =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/capsules/capsules-2.webp";
const CAPSULE_45 =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/marketing/hero-banners/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/38df08b1-72ea-49ca-b0cc-82c43406193b-hero-asset-capsule-45.png";

export default function ProductGallery() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Minimal label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-10 lg:mb-14"
        >
          <div className="h-[1px] w-12 bg-cyan/40" />
          <p className="text-cyan text-[11px] tracking-[0.4em] uppercase font-medium">
            Up Close
          </p>
        </motion.div>

        {/* Editorial hero row — large image left, stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">
          {/* Large hero — pouch macro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[560px] overflow-hidden group"
          >
            <Image
              src={POUCH_CLOSEUP_2}
              alt="Motion nootropic pouches — macro detail"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white text-2xl lg:text-3xl font-light tracking-tight">
                Nootropic Pouches
              </p>
              <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase mt-2">
                Sublingual delivery
              </p>
            </div>
          </motion.div>

          {/* Stacked right — capsule images */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative aspect-[4/3] lg:h-[274px] overflow-hidden group"
            >
              <Image
                src={CAPSULES_1}
                alt="Limitless capsules"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-lg font-light">Limitless Capsules</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] lg:h-[274px] overflow-hidden group"
            >
              <Image
                src={CAPSULE_45}
                alt="Limitless capsule — angled view"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Full-width cinematic banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative aspect-[21/9] overflow-hidden group my-3"
        >
          <Image
            src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/17ac2d41-da2a-46b3-9fbf-54bd5c2f6672.png"
            alt="Motion nootropic pouches — premium detail"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div>
              <p className="text-white text-xl lg:text-2xl font-light tracking-tight">
                Precision Crafted
              </p>
              <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase mt-2">
                Every detail matters
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom strip — three detail shots */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { src: POUCH_PILE, alt: "Motion pouches" },
            { src: POUCH_CLOSEUP_1, alt: "Pouch macro" },
            { src: CAPSULES_2, alt: "Capsules detail" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="relative aspect-[3/2] overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-white/50 text-[12px] tracking-[0.3em] uppercase mt-10 lg:mt-14"
        >
          Two formats &mdash; One mission
        </motion.p>
      </div>
    </section>
  );
}
