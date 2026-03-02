"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Model3D } from "@/lib/api";

export default function Renders3D({ models }: { models: Model3D[] }) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  if (!models.length) return null;

  return (
    <section className="relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 lg:mb-32"
        >
          <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
            Interactive 3D
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-white">
            See it from every angle.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {models.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative bg-[#0a0a0a] border border-white/[0.04] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="relative aspect-square bg-[#070707]">
                {/* @ts-expect-error model-viewer is a web component */}
                <model-viewer
                  src={model.file_url}
                  alt={model.title}
                  auto-rotate
                  camera-controls
                  shadow-intensity="0.5"
                  environment-image="neutral"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#070707",
                    "--poster-color": "#070707",
                  } as React.CSSProperties}
                />
              </div>

              <div className="p-6">
                <h3 className="text-sm font-light text-white tracking-wide">
                  {model.title}
                </h3>
                <p className="text-[11px] text-muted/40 mt-1">
                  Drag to rotate
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
