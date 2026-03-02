import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, ProductReview } from "@/lib/api";

// ── cn() helper ─────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Color tokens ────────────────────────────────────────
export const colors = {
  cyan: "#22d3ee",
  cyanDark: "#06b6d4",
  cyanLight: "#67e8f9",
  mint: "#34d399",
  mango: "#fbbf24",
  bluerazz: "#60a5fa",
  capsules: "#22d3ee",
  background: "#050505",
  foreground: "#fafafa",
  surface: "#111111",
  surfaceLight: "#1a1a1a",
  border: "#1f1f1f",
  muted: "#a1a1aa",
} as const;

// ── Accent helpers (single source of truth) ─────────────
export function getAccent(product: Product): string {
  return product.custom_fields?.flavor_color || colors.cyan;
}

export function getAccentFromReview(review: ProductReview): string {
  if (review.flavor_color) return review.flavor_color;
  const name = (review.product_name || "").toLowerCase();
  if (name.includes("mint")) return colors.mint;
  if (name.includes("mango")) return colors.mango;
  if (name.includes("blue") || name.includes("raspberry")) return colors.bluerazz;
  return colors.cyan;
}

export function getProductLabel(review: ProductReview): string {
  const name = (review.product_name || "").toLowerCase();
  if (name.includes("mint")) return "Mint";
  if (name.includes("mango")) return "Mango";
  if (name.includes("blue") || name.includes("raspberry")) return "Blue Razz";
  if (name.includes("capsule") || name.includes("limitless")) return "Capsules";
  return "MOTION";
}

// ── Framer Motion presets ───────────────────────────────
export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const motionPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: smoothEase },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
  staggerChildren: (delay = 0.08) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: smoothEase },
  }),
  scaleIn: {
    initial: { opacity: 0, scale: 0.85 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: smoothEase },
  },
} as const;

// ── Time helpers ────────────────────────────────────────
export function timeAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}
