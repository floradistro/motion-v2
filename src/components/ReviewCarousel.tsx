"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/hooks/use-auth";
import Stars from "@/components/ui/Stars";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────── */

interface Review {
  id: string;
  product_id: string;
  reviewer_name: string;
  rating: number;
  title?: string | null;
  review_text: string;
  verified_purchase: boolean;
  helpful_count: number;
  metadata?: {
    reviewer_name?: string;
    reviewer_role?: string;
  };
  created_at: string;
}

/* ─── Review Card ────────────────────────────────────── */

function ReviewCard({ review, accent }: { review: Review; accent: string }) {
  const name = review.metadata?.reviewer_name || "Customer";
  const role = review.metadata?.reviewer_role || "";
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] snap-center p-6 bg-white/[0.02] border border-white/[0.04] card-shimmer relative overflow-hidden group">
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ backgroundColor: accent }}
      />

      <Stars rating={review.rating} accent={accent} />

      {review.title && (
        <h4 className="text-[14px] text-white font-medium mt-3 mb-2 leading-snug">
          {review.title}
        </h4>
      )}

      <p className="text-[13px] text-muted/50 font-light leading-relaxed line-clamp-4">
        {review.review_text}
      </p>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
        <div className="flex-1 min-w-0">
          <span className="text-[12px] text-white/70 font-medium">
            {name}
          </span>
          {role && (
            <span className="text-[11px] text-muted/30 ml-2">{role}</span>
          )}
        </div>
        {review.verified_purchase && (
          <span
            className="flex-shrink-0 text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-medium"
            style={{
              backgroundColor: `${accent}10`,
              color: accent,
              border: `1px solid ${accent}18`,
            }}
          >
            Verified
          </span>
        )}
        <span className="flex-shrink-0 text-[11px] text-muted/25">{date}</span>
      </div>

      {/* Helpful count */}
      {review.helpful_count > 0 && (
        <div className="mt-3 flex items-center gap-1.5">
          <svg className="w-3 h-3 text-muted/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m7.594 0H5.904m0 0a48.7 48.7 0 00-.024-.006A48.4 48.4 0 015.9 13.56M3.75 21V18" />
          </svg>
          <span className="text-[10px] text-muted/20">
            {review.helpful_count} found helpful
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */

export default function ReviewCarousel({
  productId,
  accent,
}: {
  productSlug?: string;
  productId: string;
  accent: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { user, customer } = useAuthStore();

  // Review form state
  const [formRating, setFormRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch reviews by product_id
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/reviews?product_id=${encodeURIComponent(productId)}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  // Auto-advance
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = reviews.length - 1;
        return prev >= max ? 0 : prev + 1;
      });
    }, 5000);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length > 1) startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [reviews.length, startAutoPlay]);

  // Scroll to current index
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 380;
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (reviews.length > 1) startAutoPlay();
  };

  // Submit review
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRating === 0) {
      setFormError("Please select a rating");
      return;
    }
    if (!formBody.trim()) {
      setFormError("Please write a review");
      return;
    }
    setFormError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating: formRating,
          title: formTitle || undefined,
          body: formBody,
          reviewer_name: customer?.first_name || user?.email?.split("@")[0] || "Anonymous",
          customer_id: customer?.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Failed to submit");
        return;
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setSubmitted(true);
      setFormRating(0);
      setFormTitle("");
      setFormBody("");
    } catch {
      setFormError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  // Average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-[360px] h-[200px] bg-white/[0.02] border border-white/[0.04] animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8">
        <p className="text-[13px] text-muted/30 font-light mb-8">No reviews yet. Be the first!</p>

        {/* Review form */}
        <div className="pt-8 border-t border-white/[0.04]">
          {!user ? (
            <div className="text-center py-8">
              <p className="text-[13px] text-muted/40 font-light mb-3">
                Share your experience with this product
              </p>
              <Link
                href="/account"
                className="inline-block px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/[0.08] text-muted/60 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Sign in to leave a review
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-3 font-medium">
                  Your Rating
                </label>
                <Stars rating={formRating} accent={accent} size={22} interactive onRate={setFormRating} />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-2 font-medium">
                  Title <span className="text-muted/20">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Sum it up"
                  className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-[14px] text-white font-light placeholder:text-muted/20 focus:border-white/15 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-2 font-medium">
                  Your Review
                </label>
                <textarea
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  placeholder="What did you think?"
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-[14px] text-white font-light placeholder:text-muted/20 focus:border-white/15 focus:outline-none transition-colors resize-none"
                />
              </div>
              {formError && <p className="text-[12px] text-red-400 font-light">{formError}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 btn-press"
                style={{ backgroundColor: accent, color: "#000" }}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with average */}
      <div className="flex items-center gap-4 mb-8">
        <Stars rating={Math.round(avgRating)} accent={accent} size={18} />
        <span className="text-[13px] text-muted/40 font-light">
          {avgRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Arrow buttons */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((p) => (p <= 0 ? reviews.length - 1 : p - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-muted/50 hover:text-white hover:border-white/20 transition-all"
              aria-label="Previous review"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((p) => (p >= reviews.length - 1 ? 0 : p + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-muted/50 hover:text-white hover:border-white/20 transition-all"
              aria-label="Next review"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} accent={accent} />
          ))}
        </div>

        {/* Dot indicators */}
        {reviews.length > 1 && reviews.length <= 20 && (
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-4"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                style={i === currentIndex ? { backgroundColor: accent } : undefined}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Count indicator for many reviews */}
        {reviews.length > 20 && (
          <p className="text-center text-[11px] text-muted/25 mt-4">
            {currentIndex + 1} of {reviews.length}
          </p>
        )}
      </div>

      {/* Review form */}
      <div className="mt-12 pt-8 border-t border-white/[0.04]">
        {!user ? (
          <div className="text-center py-8">
            <p className="text-[13px] text-muted/40 font-light mb-3">
              Share your experience with this product
            </p>
            <Link
              href="/account"
              className="inline-block px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/[0.08] text-muted/60 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Sign in to leave a review
            </Link>
          </div>
        ) : submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="text-[14px] text-white/70 font-light">
              Thank you for your review!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-3 font-medium">
                Your Rating
              </label>
              <Stars
                rating={formRating}
                accent={accent}
                size={22}
                interactive
                onRate={setFormRating}
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-2 font-medium">
                Title <span className="text-muted/20">(optional)</span>
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Sum it up"
                className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-[14px] text-white font-light placeholder:text-muted/20 focus:border-white/15 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-muted/40 mb-2 font-medium">
                Your Review
              </label>
              <textarea
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                placeholder="What did you think?"
                rows={4}
                className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-[14px] text-white font-light placeholder:text-muted/20 focus:border-white/15 focus:outline-none transition-colors resize-none"
              />
            </div>

            {formError && (
              <p className="text-[12px] text-red-400 font-light">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 btn-press"
              style={{
                backgroundColor: accent,
                color: "#000",
              }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
