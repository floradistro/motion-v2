import { create } from "zustand";
import type { ProductReview } from "@/lib/api";

interface ReviewState {
  allReviews: ProductReview[];
  productReviews: Map<string, ProductReview[]>;
  loading: boolean;
}

interface ReviewActions {
  setAllReviews: (reviews: ProductReview[]) => void;
  setProductReviews: (productId: string, reviews: ProductReview[]) => void;
  fetchProductReviews: (productId: string) => Promise<void>;
  getAggregateRating: () => { avg: number; count: number; recommendPct: number };
  getReviewsForProduct: (productId: string) => ProductReview[];
}

export type ReviewStore = ReviewState & ReviewActions;

export const useReviewStore = create<ReviewStore>((set, get) => ({
  allReviews: [],
  productReviews: new Map(),
  loading: false,

  setAllReviews: (reviews) => set({ allReviews: reviews }),

  setProductReviews: (productId, reviews) => {
    const map = new Map(get().productReviews);
    map.set(productId, reviews);
    set({ productReviews: map });
  },

  fetchProductReviews: async (productId) => {
    const cached = get().productReviews.get(productId);
    if (cached) return;

    try {
      const res = await fetch(`/api/reviews?product_id=${encodeURIComponent(productId)}`);
      if (res.ok) {
        const data = await res.json();
        const map = new Map(get().productReviews);
        map.set(productId, data);
        set({ productReviews: map });
      }
    } catch {
      // silently fail
    }
  },

  getAggregateRating: () => {
    const reviews = get().allReviews;
    if (reviews.length === 0) return { avg: 5.0, count: 0, recommendPct: 100 };
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    const recommendPct = Math.round(
      (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100,
    );
    return { avg, count: reviews.length, recommendPct };
  },

  getReviewsForProduct: (productId) => {
    // First check dedicated product reviews cache
    const cached = get().productReviews.get(productId);
    if (cached) return cached;
    // Fallback: filter from all reviews
    return get().allReviews.filter((r) => r.product_id === productId);
  },
}));
