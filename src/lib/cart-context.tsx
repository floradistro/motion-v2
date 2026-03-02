"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/api";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  addItem: (
    productId: string,
    quantity: number,
    tier?: string,
    unitPrice?: number
  ) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

const CART_KEY = "motion_cart_id";

/**
 * Normalize raw gateway cart response so every consumer
 * can trust that items is always an array and numeric
 * fields are always numbers. This is the single boundary
 * between the API and the rest of the app.
 */
function normalizeCart(raw: Record<string, unknown>): Cart {
  const rawItems = Array.isArray(raw.items) ? raw.items : [];
  const items = rawItems.map((i: Record<string, unknown>) => ({
    object: (i.object as string) ?? "cart_item",
    id: i.id as string,
    product_id: i.product_id as string,
    product_name: (i.product_name as string) ?? "",
    sku: (i.sku as string) ?? "",
    unit_price: Number(i.unit_price) || 0,
    quantity: Number(i.quantity) || 1,
    tier_quantity: Number(i.tier_quantity) || Number(i.quantity) || 1,
    tier_label: (i.tier_label as string) ?? "",
    line_total: Number(i.line_total) || Number(i.unit_price) * Number(i.quantity) || 0,
    discount_amount: Number(i.discount_amount) || 0,
    featured_image: i.featured_image as string | undefined,
  }));
  const subtotal = Number(raw.subtotal) || items.reduce((s, i) => s + i.line_total, 0);
  return {
    object: (raw.object as string) ?? "cart",
    id: raw.id as string,
    store_id: raw.store_id as string,
    location_id: raw.location_id as string,
    customer_id: (raw.customer_id as string) ?? null,
    status: (raw.status as string) ?? "active",
    subtotal,
    discount_amount: Number(raw.discount_amount) || 0,
    tax_rate: Number(raw.tax_rate) || 0,
    tax_amount: Number(raw.tax_amount) || 0,
    total: Number(raw.total) || subtotal,
    item_count: Number(raw.item_count) || items.length,
    shipping_amount: Number(raw.shipping_amount) || 0,
    expires_at: (raw.expires_at as string) ?? "",
    items,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const getCartId = () =>
    typeof window !== "undefined" ? localStorage.getItem(CART_KEY) : null;

  const setCartId = (id: string) => localStorage.setItem(CART_KEY, id);

  /** Set cart state from a raw API response, normalizing on the way in. */
  const applyCart = useCallback((raw: Record<string, unknown>) => {
    setCart(normalizeCart(raw));
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    const existing = getCartId();
    if (existing) {
      try {
        const res = await fetch(`/api/cart/${existing}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === "active") {
            applyCart(data);
            return existing;
          }
        }
      } catch {
        // Cart expired or invalid, create new
      }
    }
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    setCartId(data.id);
    applyCart(data);
    return data.id;
  }, [applyCart]);

  const refreshCart = useCallback(async () => {
    const cartId = getCartId();
    if (!cartId) return;
    try {
      const res = await fetch(`/api/cart/${cartId}`);
      if (res.ok) {
        applyCart(await res.json());
      } else {
        // Cart no longer valid — clear stale reference
        localStorage.removeItem(CART_KEY);
        setCart(null);
      }
    } catch {
      // Network error, leave current state
    }
  }, [applyCart]);

  // Load cart on mount
  useEffect(() => {
    const cartId = getCartId();
    if (cartId) refreshCart();
  }, [refreshCart]);

  const addItem = async (
    productId: string,
    quantity: number,
    tier?: string,
    unitPrice?: number
  ) => {
    setLoading(true);
    try {
      const cartId = await ensureCart();
      const res = await fetch(`/api/cart/${cartId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          quantity,
          tier,
          unit_price: unitPrice,
        }),
      });
      if (!res.ok) {
        console.error("addItem failed:", await res.text());
        return;
      }
      // Gateway returns a cart_item, not a full cart — re-fetch the cart
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId: string, quantity: number) => {
    const cartId = getCartId();
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        console.error("updateItem failed:", await res.text());
        return;
      }
      // Gateway returns a cart_item, not a full cart — re-fetch the cart
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    const cartId = getCartId();
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount: cart?.items?.length ?? cart?.item_count ?? 0,
        addItem,
        updateItem,
        removeItem,
        refreshCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
