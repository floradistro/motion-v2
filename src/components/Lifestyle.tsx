"use client";

import { motion } from "framer-motion";

const clips = [
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/dfd441b4-0f32-4072-952c-46d91bcc0966.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/69a4a27d-3b24-4793-8219-f107bed6ea88.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/bedad23c-6502-41f2-aa66-25f9a04c2164.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/6aae26b2-d1c4-4cb4-8e2b-7582bc0730bd.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/9f2ea89c-4841-406c-afd0-56229287d030.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/e925783d-b63a-470f-b1e7-a280bc401fb4.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/eb1576fd-1991-49ac-a1aa-6ba42c0cf9fe.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/262efe8d-a0b4-4d40-bd11-e9e04d64e3bb.mp4",
];

export default function Lifestyle() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="section-divider mb-28 lg:mb-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-cyan text-[11px] tracking-[0.4em] uppercase mb-16 lg:mb-20"
        >
          Who&apos;s on it
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {clips.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative aspect-[3/4] overflow-hidden group"
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-28 lg:mt-40" />
    </section>
  );
}
