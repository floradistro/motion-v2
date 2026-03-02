"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Molecule, molecules, ingredients } from "@/lib/molecules";

const MINT_TILT =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/mint/mint-can-tilt.png";
const POUCH_CLOSEUP =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/products/pouches-all-flavors/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/ffc7b1b5-ce41-4320-9abb-be8f4b7b35e9-freepik-pouch-closeup-2.png";
const CAPSULE_BOTTLE =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/products/capsules-limitless/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/5fc96aa2-f250-466c-8739-fd480826065c-capsules-bottle-front.png";

/* ─── Component ──────────────────────────────────────────────────────── */

export default function Science() {
  return (
    <section id="science" className="relative py-32 lg:py-48 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Hero: title + floating can ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-28 lg:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
              What&apos;s Inside
            </p>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-white leading-[0.95] mb-10">
              No filler.
              <br />
              No BS.
            </h2>
            <p className="text-muted text-lg lg:text-xl font-light leading-relaxed max-w-lg">
              Every dose is on the label. Absorbed through the gum lining so it
              hits faster than anything you swallow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={MINT_TILT}
                alt="MOTION Pouch"
                width={500}
                height={500}
                className="object-contain w-[320px] sm:w-[420px] lg:w-[500px] drop-shadow-[0_50px_120px_rgba(52,211,153,0.25)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Section label ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-14 lg:mb-20"
        >
          <div className="h-[1px] w-12 bg-cyan/40" />
          <p className="text-[12px] tracking-[0.35em] uppercase text-muted/50">
            The Formula
          </p>
        </motion.div>

        {/* ── Ingredients with molecules ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04]">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface p-8 lg:p-12 group hover:bg-surface-light transition-colors duration-500 relative overflow-hidden"
            >
              {/* Molecule SVG — background decorative element */}
              <div className="absolute -top-2 -right-2 w-[140px] h-[120px] lg:w-[180px] lg:h-[150px] opacity-[0.035] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <Molecule
                  data={molecules[ing.molecule]}
                  className="w-full h-full"
                />
              </div>

              {/* Molecule SVG — visible inline */}
              <div className="h-20 lg:h-24 mb-6 flex items-center">
                <div className="opacity-50 group-hover:opacity-90 transition-opacity duration-500 w-full max-w-[160px] lg:max-w-[200px] h-full">
                  <Molecule
                    data={molecules[ing.molecule]}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Data */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <h3 className="text-lg lg:text-xl font-light text-white">
                  {ing.name}
                </h3>
                <span className="text-[13px] tracking-[0.1em] text-cyan/80 font-mono">
                  {ing.dose}
                </span>
              </div>
              <p className="text-[11px] text-muted/30 font-mono tracking-wider mb-4">
                {ing.formula}
              </p>
              <p className="text-[15px] text-muted/60 font-light leading-relaxed">
                {ing.benefit}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Product closeups — pouch + capsule ──────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <div className="relative aspect-[16/9] overflow-hidden group">
            <Image
              src={POUCH_CLOSEUP}
              alt="Motion nootropic pouch — closeup"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                Nootropic Pouch
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden group bg-[#0a0a0a]">
            <Image
              src={CAPSULE_BOTTLE}
              alt="Limitless capsules bottle"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-contain transition-transform duration-[1.2s] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                Limitless Capsules
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── How it works ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 lg:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-20"
        >
          {[
            {
              step: "01",
              title: "Park it",
              desc: "Tuck a pouch under your upper lip",
            },
            {
              step: "02",
              title: "Let it work",
              desc: "Absorbs through the gum in 2\u20135 min",
            },
            {
              step: "03",
              title: "Go",
              desc: "6+ hours of locked-in focus",
            },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-6">
              <span className="text-3xl lg:text-4xl font-mono text-cyan/20 mt-1">
                {s.step}
              </span>
              <div>
                <h4 className="text-2xl lg:text-3xl font-light text-white mb-3">
                  {s.title}
                </h4>
                <p className="text-base text-muted/70 font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
