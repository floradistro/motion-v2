"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MINT =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/mint/mint-can-front.png";
const MANGO =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/mango/mango-can-front.png";
const BLUERAZZ =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/motion-pouches/blue-raspberry/bluerazz-can-front.png";

export default function ProductHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060606] flex items-center">
      {/* Ambient glow behind products */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_60%)] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
        {/* Giant title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 lg:mb-24"
        >
          <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6 font-medium">
            Pick Your Weapon
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-[120px] font-extralight tracking-tight text-white leading-[0.9]">
            Three flavors.
            <br />
            <span className="text-gradient font-light">Same fire.</span>
          </h2>
        </motion.div>

        {/* Massive floating cans */}
        <div className="relative flex items-center justify-center h-[450px] sm:h-[550px] lg:h-[700px]">
          {/* Mango — left */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute left-[5%] sm:left-[10%] lg:left-[15%] z-20"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <Image
                src={MANGO}
                alt="Mango Pouches"
                width={380}
                height={380}
                className="object-contain w-[220px] sm:w-[300px] lg:w-[380px] drop-shadow-[0_40px_100px_rgba(251,191,36,0.3)]"
              />
            </motion.div>
          </motion.div>

          {/* Mint — center hero */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-30"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={MINT}
                alt="Mint Pouches"
                width={500}
                height={500}
                className="object-contain w-[300px] sm:w-[400px] lg:w-[500px] drop-shadow-[0_50px_120px_rgba(52,211,153,0.35)]"
              />
            </motion.div>
          </motion.div>

          {/* Blue Razz — right */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 15 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute right-[5%] sm:right-[10%] lg:right-[15%] z-20"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <Image
                src={BLUERAZZ}
                alt="Blue Raspberry Pouches"
                width={380}
                height={380}
                className="object-contain w-[220px] sm:w-[300px] lg:w-[380px] drop-shadow-[0_40px_100px_rgba(96,165,250,0.3)]"
              />
            </motion.div>
          </motion.div>

          {/* Floor reflection */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[60px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)] rounded-full" />
        </div>

        {/* Flavor dots — bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center gap-12 mt-16"
        >
          {[
            { label: "Mint", color: "#34d399" },
            { label: "Mango", color: "#fbbf24" },
            { label: "Blue Razz", color: "#60a5fa" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
              <span className="text-[14px] tracking-wider text-muted/80 uppercase">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
