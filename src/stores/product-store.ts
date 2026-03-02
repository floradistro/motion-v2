import { create } from "zustand";
import type { Product } from "@/lib/api";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface ProductActions {
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
}

export type ProductStore = ProductState & ProductActions;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products, loading: false, error: null }),

  fetchProducts: async () => {
    if (get().products.length > 0) return;
    set({ loading: true });
    try {
      const res = await fetch("/api/cart"); // We'll use a products endpoint
      // Products are server-fetched and hydrated — this is a fallback
      const products = await res.json();
      set({ products: products.data || products || [], loading: false });
    } catch {
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  getProductBySlug: (slug) => get().products.find((p) => p.slug === slug),
  getProductById: (id) => get().products.find((p) => p.id === id),
}));
