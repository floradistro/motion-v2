"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const CUT_DURATION = 2.5;

const CLIPS = [
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/e0f17a58-fc72-462e-a74b-642a3387ae9c.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/c218ede6-2301-40f8-a101-d70c3f45d84c.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/6b81be9c-a5a0-4223-8080-73a062d3fd16.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/a6103ee0-0d6e-47de-b266-3692eb32d596.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/d1b91008-3046-4ac6-88ad-00f28c37f374.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/3363e588-e5b7-4764-897b-0fd4daa64e17.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/b93b0828-7281-4da7-b166-758218499596.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/079f3535-6adb-44fe-92d2-e1d32af2974f.mp4",
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/store-media/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/videos/a91bd093-b6de-4c4e-95ad-2265592de3f2.mp4",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload current + next video only
  const preloadNext = useCallback((idx: number) => {
    const next = (idx + 1) % CLIPS.length;
    setLoaded((prev) => {
      if (prev.has(next)) return prev;
      const s = new Set(prev);
      s.add(next);
      return s;
    });
    // Start loading next video
    const nextVid = videoRefs.current[next];
    if (nextVid && !nextVid.src) {
      nextVid.src = CLIPS[next];
      nextVid.load();
    }
  }, []);

  const advance = useCallback(() => {
    setCurrent((prev) => {
      const next = (prev + 1) % CLIPS.length;
      const nextVid = videoRefs.current[next];
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }
      // Preload the one after next
      preloadNext(next);
      return next;
    });
  }, [preloadNext]);

  useEffect(() => {
    timerRef.current = setInterval(advance, CUT_DURATION * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  // Load & play first video, preload second
  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      first.src = CLIPS[0];
      first.load();
      first.play().catch(() => {});
    }
    preloadNext(0);
  }, [preloadNext]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        {CLIPS.map((src, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            // Only set src for loaded videos (lazy loading)
            src={loaded.has(i) ? src : undefined}
            muted
            playsInline
            preload={i === 0 ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.08s linear",
            }}
          />
        ))}

        <motion.div
          key={current}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-white pointer-events-none z-[1]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/20 to-[#050505] z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent z-[2]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-32 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-8 font-medium"
          >
            Not Nicotine. Not Coffee. Better.
          </motion.p>

          <h1 className="text-7xl sm:text-8xl lg:text-[160px] font-extralight tracking-tighter leading-[0.85] text-white mb-12">
            Move
            <br />
            <span className="text-gradient font-light">Different.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-muted text-xl lg:text-2xl font-light leading-relaxed max-w-xl mb-14"
          >
            7 nootropics. One pouch. 6+ hours of dialed-in focus
            with zero crash and zero nicotine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 sm:gap-5"
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 bg-white text-black px-10 sm:px-12 py-4 sm:py-5 text-[13px] sm:text-[14px] tracking-[0.15em] uppercase font-medium hover:bg-cyan transition-all duration-300"
            >
              Get Yours
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#science"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 sm:px-12 py-4 sm:py-5 text-[13px] sm:text-[14px] tracking-[0.15em] uppercase font-light hover:border-cyan/50 hover:text-cyan transition-all duration-300"
            >
              What&apos;s Inside
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted/40">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
