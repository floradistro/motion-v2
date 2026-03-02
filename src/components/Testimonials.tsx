"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useReviewStore } from "@/stores/review-store";
import { getAccentFromReview, getProductLabel, timeAgo } from "@/lib/design-system";
import Stars from "@/components/ui/Stars";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import type { ProductReview } from "@/lib/api";

/* ─── Aggregate Rating ───────────────────────────────── */

function AggregateRating({ reviews }: { reviews: ProductReview[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const recommendPct =
    reviews.length > 0
      ? Math.round(
          (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100,
        )
      : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-20 lg:mb-28"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-6xl lg:text-7xl font-light text-white number-glow">
          {avg}
        </span>
        <div className="flex flex-col gap-1">
          <Stars rating={Math.round(Number(avg))} accent="#22d3ee" />
          <span className="text-[11px] text-white/50 tracking-wider">
            out of 5
          </span>
        </div>
      </div>

      <div className="hidden sm:block w-[1px] h-12 bg-white/[0.06]" />

      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-2xl font-light text-white">
            {reviews.length.toLocaleString()}
          </p>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-1">
            Reviews
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-light text-white">{recommendPct}%</p>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-1">
            Recommend
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Marquee Strip ──────────────────────────────────── */

function MarqueeStrip({ reviews }: { reviews: ProductReview[] }) {
  const snippets = useMemo(
    () =>
      reviews
        .filter((r) => r.title)
        .slice(0, 14)
        .map((r) => r.title!),
    [reviews],
  );

  if (snippets.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-5 mb-12">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-5 animate-marquee">
        {[...snippets, ...snippets].map((title, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.02] border border-white/[0.04] rounded-full"
          >
            <svg
              className="w-3 h-3 text-cyan/40 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[12px] text-white/50 whitespace-nowrap font-light">
              &ldquo;{title}&rdquo;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Review Card ────────────────────────────────────── */

function ReviewCard({
  review,
  index,
  large,
}: {
  review: ProductReview;
  index: number;
  large?: boolean;
}) {
  const accent = getAccentFromReview(review);
  const reviewerName = review.metadata?.reviewer_name || "Anonymous";
  const reviewerRole = review.metadata?.reviewer_role || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.08, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative group overflow-hidden flex-shrink-0 ${
        large ? "w-full" : "w-[340px] sm:w-[380px] lg:w-[420px]"
      }`}
    >
      <div
        className={`relative h-full border border-white/[0.04] hover:border-white/[0.1] transition-all duration-700 card-shimmer overflow-hidden ${
          large ? "p-8 sm:p-10 lg:p-14" : "p-6 sm:p-8 lg:p-10"
        }`}
        style={{
          background: large
            ? `linear-gradient(135deg, ${accent}03, transparent 60%)`
            : "rgba(255,255,255,0.015)",
        }}
      >
        <div
          className="absolute top-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
          style={{ backgroundColor: accent }}
        />

        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
          style={{ backgroundColor: `${accent}06` }}
        />

        <div
          className="absolute -top-2 -left-1 text-[100px] font-serif leading-none pointer-events-none select-none"
          style={{ color: accent, opacity: large ? 0.05 : 0.03 }}
        >
          &ldquo;
        </div>

        <div className="flex items-center gap-3 mb-5 relative">
          <Stars rating={review.rating} accent={accent} />
          {review.verified_purchase && (
            <Badge accent={accent} variant="verified" />
          )}
        </div>

        {review.title && (
          <h4
            className={`font-medium text-white/95 mb-3 leading-snug ${
              large ? "text-lg lg:text-xl" : "text-[15px]"
            }`}
          >
            {review.title}
          </h4>
        )}

        <p
          className={`relative font-light text-white/80 leading-relaxed mb-8 ${
            large
              ? "text-[16px] lg:text-lg"
              : "text-[14px] line-clamp-4"
          }`}
        >
          {review.review_text}
        </p>

        <div className="flex items-center justify-between mt-auto relative">
          <div className="flex items-center gap-3">
            <Avatar name={reviewerName} accent={accent} />
            <div>
              <p className="text-[14px] font-light text-white">
                {reviewerName}
              </p>
              {reviewerRole && (
                <p className="text-[11px] text-white/50 mt-0.5">
                  {reviewerRole}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <Badge accent={accent}>
              {getProductLabel(review)}
            </Badge>
            <span className="text-[10px] text-white/40">
              {timeAgo(review.created_at)}
            </span>
          </div>
        </div>

        {review.helpful_count > 0 && (
          <div className="mt-5 pt-5 border-t border-white/[0.03] flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-white/35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m7.594 0H5.904m0 0a48.7 48.7 0 00-.024-.006A48.4 48.4 0 015.9 13.56M3.75 21V18"
              />
            </svg>
            <span className="text-[11px] text-white/35">
              {review.helpful_count} found this helpful
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Scrollable Row ─────────────────────────────────── */

function ReviewCarousel({
  reviews,
  startIndex,
}: {
  reviews: ProductReview[];
  startIndex: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide px-1 py-1"
      >
        {reviews.map((review, i) => (
          <ReviewCard
            key={review.id}
            review={review}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Filter Tabs ────────────────────────────────────── */

const FILTER_ALL = "all";

function FilterTabs({
  reviews,
  active,
  onSelect,
}: {
  reviews: ProductReview[];
  active: string;
  onSelect: (f: string) => void;
}) {
  const products = useMemo(() => {
    const seen = new Map<string, { label: string; accent: string; count: number }>();
    for (const r of reviews) {
      const label = getProductLabel(r);
      const existing = seen.get(label);
      if (existing) {
        existing.count++;
      } else {
        seen.set(label, { label, accent: getAccentFromReview(r), count: 1 });
      }
    }
    return Array.from(seen.values());
  }, [reviews]);

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
      <button
        onClick={() => onSelect(FILTER_ALL)}
        className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium border transition-all duration-300 ${
          active === FILTER_ALL
            ? "bg-white/[0.06] border-white/15 text-white"
            : "bg-transparent border-white/[0.04] text-white/50 hover:text-white/70 hover:border-white/[0.08]"
        }`}
      >
        All ({reviews.length})
      </button>
      {products.map((p) => (
        <button
          key={p.label}
          onClick={() => onSelect(p.label)}
          className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium border transition-all duration-300 ${
            active === p.label
              ? "bg-white/[0.06] border-white/15 text-white"
              : "bg-transparent border-white/[0.04] text-white/50 hover:text-white/70 hover:border-white/[0.08]"
          }`}
          style={
            active === p.label
              ? { borderColor: `${p.accent}30`, color: p.accent }
              : undefined
          }
        >
          {p.label} ({p.count})
        </button>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */

export default function Testimonials() {
  const reviews = useReviewStore((s) => s.allReviews);
  const [filter, setFilter] = useState(FILTER_ALL);

  if (reviews.length === 0) return null;

  const filtered =
    filter === FILTER_ALL
      ? reviews
      : reviews.filter((r) => getProductLabel(r) === filter);

  const featured = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <section className="relative py-16 sm:py-24 lg:py-36 overflow-hidden">
      <div className="section-divider mb-14 sm:mb-20 lg:mb-32" />

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_60%)] aurora-orb pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.025)_0%,transparent_60%)] aurora-orb-2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-cyan text-[13px] tracking-[0.4em] uppercase mb-6">
            Word of Mouth
          </p>
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white">
            Don&apos;t take our word for it.
          </h2>
        </motion.div>

        <AggregateRating reviews={reviews} />
        <MarqueeStrip reviews={reviews} />
        <FilterTabs reviews={reviews} active={filter} onSelect={setFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-8">
          {featured.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} large />
          ))}
        </div>

        {rest.length > 0 && (
          <ReviewCarousel reviews={rest} startIndex={3} />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 lg:mt-20"
        >
          <p className="text-[13px] text-white/40 font-light">
            Showing {filtered.length} of {reviews.length} reviews
          </p>
        </motion.div>
      </div>

      <div className="section-divider mt-14 sm:mt-20 lg:mt-32" />
    </section>
  );
}
