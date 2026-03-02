"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/design-system";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <motion.div
      {...motionPresets.fadeInUp}
      className={`text-center ${className ?? ""}`}
    >
      <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
        {label}
      </p>
      <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-white">
        {title}
      </h2>
    </motion.div>
  );
}
