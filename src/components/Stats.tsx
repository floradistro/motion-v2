"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    if (!isInView) return;
    const duration = 2200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 51847, suffix: "+", label: "People on it", accent: "#22d3ee" },
  { value: 483290, suffix: "+", label: "Pouches gone", accent: "#34d399" },
  { value: 4.87, suffix: "/5", label: "Avg. rating", accent: "#fbbf24" },
  { value: 6, suffix: "+ hrs", label: "Per pouch", accent: "#60a5fa" },
];

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="glow-line mb-24 lg:mb-32 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center lg:border-r lg:last:border-r-0 border-white/[0.04] group"
            >
              <div
                className="w-1.5 h-1.5 rounded-full mx-auto mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: stat.accent }}
              />

              <div className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-4 number-glow">
                {typeof stat.value === "number" && stat.value > 100 ? (
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                ) : (
                  <>
                    {stat.value}
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-muted/50 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glow-line mt-24 lg:mt-32 opacity-40" />
    </section>
  );
}
