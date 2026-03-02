"use client";

import { useRef } from "react";
import { useProductStore } from "@/stores/product-store";
import { useReviewStore } from "@/stores/review-store";
import type { Product, ProductReview } from "@/lib/api";

interface StoreHydratorProps {
  products?: Product[];
  reviews?: ProductReview[];
}

export default function StoreHydrator({ products, reviews }: StoreHydratorProps) {
  const hydrated = useRef(false);
  if (!hydrated.current) {
    if (products) useProductStore.setState({ products, loading: false });
    if (reviews) useReviewStore.setState({ allReviews: reviews });
    hydrated.current = true;
  }
  return null;
}
