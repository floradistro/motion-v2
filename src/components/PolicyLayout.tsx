"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ─── Types ─── */

export type ContentBlock =
  | string
  | { subheading: string }
  | { list: string[] }
  | { table: { headers: string[]; rows: string[][] } };

export interface PolicySection {
  number: string;
  title: string;
  content: ContentBlock[];
}

interface PolicyLayoutProps {
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  sections: PolicySection[];
  contactEmail: string;
  contactPhone?: string;
  contactHours?: string;
  contactResponse?: string;
  children?: React.ReactNode;
}

/* ─── Content renderer ─── */

function RenderBlock({ block }: { block: ContentBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-sm text-muted/50 font-light leading-relaxed">
        {block}
      </p>
    );
  }
  if ("subheading" in block) {
    return (
      <h3 className="text-[13px] text-white/80 font-medium tracking-tight mt-4 mb-1">
        {block.subheading}
      </h3>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-1.5 my-2">
        {block.list.map((item, i) => (
          <li
            key={i}
            className="text-sm text-muted/50 font-light leading-relaxed flex items-start gap-2.5"
          >
            <span className="w-1 h-1 rounded-full bg-cyan/40 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if ("table" in block) {
    return (
      <div className="my-3 overflow-x-auto rounded-xl border border-white/[0.04]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {block.table.headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left text-[11px] tracking-[0.15em] uppercase text-muted/60 font-medium px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.02] last:border-0"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="text-muted/50 font-light px-4 py-2.5"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

/* ─── Component ─── */

export default function PolicyLayout({
  label,
  title,
  titleAccent,
  subtitle,
  heroImage,
  lastUpdated = "August 25, 2025",
  effectiveDate = "August 25, 2025",
  sections,
  contactEmail,
  contactPhone,
  contactHours,
  contactResponse,
  children,
}: PolicyLayoutProps) {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 sm:pt-48 pb-20 sm:pb-28 overflow-hidden">
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>
        )}

        {!heroImage && (
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 60%)",
            }}
          />
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-6">
              {label}
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tighter leading-[0.95]">
              {title}{" "}
              <span className="text-gradient">{titleAccent}</span>
            </h1>

            <p className="mt-6 text-muted/60 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>

            <div className="mt-6 flex items-center justify-center gap-6 text-[11px] tracking-[0.15em] uppercase text-muted/30">
              <span>Effective: {effectiveDate}</span>
              <span className="w-1 h-1 rounded-full bg-muted/20" />
              <span>Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pb-32 lg:pb-48">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {children}

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, i) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.3) }}
                className="rounded-2xl border border-white/[0.04] bg-surface p-6 sm:p-8 hover:border-white/[0.08] transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan/[0.06] border border-cyan/[0.1] flex items-center justify-center text-[11px] font-mono text-cyan/80 tracking-wider">
                    {section.number}
                  </span>
                  <h2 className="text-lg sm:text-xl font-light text-white pt-1.5 tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-2 pl-0 sm:pl-14">
                  {section.content.map((block, j) => (
                    <RenderBlock key={j} block={block} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last updated */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center text-[11px] tracking-[0.25em] uppercase text-muted/30"
          >
            Last updated: {lastUpdated}
          </motion.p>

          {/* Divider */}
          <div className="my-16 sm:my-20 section-divider" />

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="glass rounded-2xl p-10 sm:p-14">
              <h2 className="text-xl sm:text-2xl font-extralight tracking-tight text-white mb-6">
                Contact Information
              </h2>
              <div className="flex flex-col items-center gap-3 text-sm text-muted/50 font-light">
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-cyan transition-colors"
                >
                  {contactEmail}
                </a>
                {contactPhone && <p>{contactPhone}</p>}
                {contactHours && <p>{contactHours}</p>}
                {contactResponse && (
                  <p className="text-muted/30 text-[12px]">
                    {contactResponse}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
