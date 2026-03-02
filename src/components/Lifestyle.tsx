"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

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

function LazyVideo({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative aspect-[3/4] overflow-hidden group"
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
    </motion.div>
  );
}

export default function Lifestyle() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-36 overflow-hidden">
      <div className="section-divider mb-14 sm:mb-20 lg:mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-cyan text-[12px] tracking-[0.4em] uppercase mb-10 lg:mb-16"
        >
          Who&apos;s on it
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {clips.map((src, i) => (
            <LazyVideo key={i} src={src} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider mt-14 sm:mt-20 lg:mt-32" />
    </section>
  );
}
