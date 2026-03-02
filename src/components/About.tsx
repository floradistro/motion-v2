"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Image URLs ──────────────────────────────────────────────────────── */

const IMG_ATHLETE =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/b5261e04-16a7-4ff8-ab3c-cb71f36f69de.png";
const IMG_LAB =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/364466c6-e3e6-4893-b407-ad824ad13681.png";
const IMG_CREATIVE =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/7a8d1df5-9362-4208-9d53-5b9c19a57377.png";
const IMG_TRAIL =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/17d5c29b-73aa-4da2-a10a-3b3fa4d8d00d.png";
const IMG_COWORK =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/eeae5a2c-9ff1-43c4-baef-e2e70977d03b.png";

/* ── Value props ─────────────────────────────────────────────────────── */

const VALUES = [
  {
    title: "Clinical doses, not fairy dust",
    desc: "Every ingredient at research-backed levels. No underdosing, no pixie-dusting.",
  },
  {
    title: "No proprietary blends",
    desc: "Full label transparency. You see exactly what you're putting in your body and how much.",
  },
  {
    title: "Third-party tested",
    desc: "Every batch tested for purity, potency, and heavy metals by independent labs.",
  },
  {
    title: "Sublingual absorption",
    desc: "Absorbed through the gum lining for faster onset and higher bioavailability than capsules.",
  },
];

/* ── Stats ───────────────────────────────────────────────────────────── */

const STATS = [
  { value: "Zero", label: "Nicotine" },
  { value: "7", label: "Nootropics" },
  { value: "FDA", label: "Compliant facility" },
  { value: "100%", label: "Third-party tested" },
];

/* ── Fade-up variant ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Component ───────────────────────────────────────────────────────── */

export default function About() {
  return (
    <section id="about" className="relative bg-background overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────────
          1. Full-bleed hero image
      ───────────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        <Image
          src={IMG_ATHLETE}
          alt="Athlete training in the gym — built for those who refuse to settle"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end z-10">
          <div className="w-full px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-24 max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cyan text-[12px] tracking-[0.4em] uppercase mb-5"
            >
              About Motion
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.05] max-w-3xl"
            >
              Built for those who
              <br />
              <span className="text-gradient font-light">refuse to settle.</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. Brand manifesto
      ───────────────────────────────────────────────────────────────── */}
      <div className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-tight mb-10 sm:mb-14"
          >
            We started MOTION because the world runs on stimulants that steal as
            much as they give. Caffeine crashes. Nicotine addiction. Sugar
            spikes. We knew there had to be a better way.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={0.15}
            className="text-lg sm:text-xl lg:text-2xl font-light text-white/70 leading-relaxed max-w-3xl"
          >
            So we went back to the science. Seven nootropic compounds, each
            clinically dosed, delivered through the fastest absorption pathway
            the body has: the oral mucosa. No crash. No jitters. No dependency.
            Just hours of clean, locked-in focus whenever you need it.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="glow-line mt-16 sm:mt-24 lg:mt-36 origin-left"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          3. Image + text grid (R&D Lab)
      ───────────────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16 sm:pb-24 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-3">
          {/* Left: Lab image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[600px] overflow-hidden"
          >
            <Image
              src={IMG_LAB}
              alt="MOTION R&D laboratory — science-backed formulation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/80">
                Our Lab
              </span>
            </div>
          </motion.div>

          {/* Right: Text block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center py-8 lg:py-0 lg:pl-12 xl:pl-20"
          >
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="text-cyan text-[12px] tracking-[0.4em] uppercase mb-6"
            >
              Science-backed
            </motion.p>
            <motion.h3
              variants={fadeUp}
              custom={0.2}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.1] mb-8 sm:mb-10"
            >
              Formulated to
              <br />
              perform.
            </motion.h3>
            <motion.p
              variants={fadeUp}
              custom={0.3}
              className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-12 sm:mb-14 max-w-md"
            >
              Every ingredient earns its place. We dose at levels the research
              supports, package it all in a pouch you can use anywhere, and
              test every single batch before it ships.
            </motion.p>

            {/* Value props */}
            <div className="space-y-8">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  custom={0.35 + i * 0.08}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan mt-2 shrink-0" />
                  <div>
                    <h4 className="text-white text-base sm:text-lg font-light mb-1">
                      {v.title}
                    </h4>
                    <p className="text-white/70 text-sm sm:text-[15px] font-light leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          4. Lifestyle image strip (full-bleed, 3 images)
      ───────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <div className="grid grid-cols-3 gap-[3px]">
          {[
            { src: IMG_TRAIL, alt: "Trail runner pushing limits in nature" },
            { src: IMG_CREATIVE, alt: "Creative professional in deep focus" },
            { src: IMG_COWORK, alt: "Builders collaborating in co-working space" },
          ].map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[13px] sm:text-[14px] tracking-[0.3em] uppercase text-white/70 font-light mt-6 sm:mt-8 lg:mt-10 px-4"
        >
          Athletes. Creators. Builders. Thinkers.
        </motion.p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────
          5. Numbers / impact row
      ───────────────────────────────────────────────────────────────── */}
      <div className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glow-line mb-16 sm:mb-20 lg:mb-24 origin-center"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight number-glow mb-3">
                {stat.value}
              </p>
              <p className="text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-white/70 font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glow-line mt-16 sm:mt-20 lg:mt-24 origin-center"
        />
      </div>
    </section>
  );
}
