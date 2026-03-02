import { create } from "zustand";
import { whaletools } from "@neowhale/telemetry";
import type { Cart, CartItem } from "@/lib/api";

const CART_KEY = "motion_cart_id";

function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_KEY);
}

function setCartId(id: string) {
  localStorage.setItem(CART_KEY, id);
}

function normalizeCart(raw: Record<string, unknown>): Cart {
  const rawItems = Array.isArray(raw.items) ? raw.items : [];
  const items: CartItem[] = rawItems.map((i: Record<string, unknown>) => ({
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

interface CartState {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
}

interface CartActions {
  addItem: (productId: string, quantity: number, tier?: string, unitPrice?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
  initialize: () => void;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  itemCount: 0,

  initialize: () => {
    const cartId = getCartId();
    if (cartId) get().refreshCart();
  },

  refreshCart: async () => {
    const cartId = getCartId();
    if (!cartId) return;
    try {
      const res = await fetch(`/api/cart/${cartId}`);
      if (res.ok) {
        const raw = await res.json();
        const cart = normalizeCart(raw);
        set({ cart, itemCount: cart.items?.length ?? cart.item_count ?? 0 });
      } else {
        localStorage.removeItem(CART_KEY);
        set({ cart: null, itemCount: 0 });
      }
    } catch {
      // Network error, leave current state
    }
  },

  addItem: async (productId, quantity, tier?, unitPrice?) => {
    set({ loading: true });
    try {
      // Ensure cart exists
      let cartId = getCartId();
      if (!cartId) {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        cartId = data.id;
        setCartId(cartId!);
        const cart = normalizeCart(data);
        set({ cart, itemCount: cart.items?.length ?? 0 });
      } else {
        // Validate existing cart
        try {
          const checkRes = await fetch(`/api/cart/${cartId}`);
          if (checkRes.ok) {
            const data = await checkRes.json();
            if (data.status !== "active") {
              const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
              });
              const newData = await res.json();
              cartId = newData.id;
              setCartId(cartId!);
            }
          } else {
            const res = await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}),
            });
            const newData = await res.json();
            cartId = newData.id;
            setCartId(cartId!);
          }
        } catch {
          // If check fails, try creating new cart
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          });
          const newData = await res.json();
          cartId = newData.id;
          setCartId(cartId!);
        }
      }

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
      // Gateway returns cart_item, not full cart — re-fetch
      await get().refreshCart();

      // Track add_to_cart event
      const cart = get().cart;
      whaletools.track("add_to_cart", {
        product_id: productId,
        quantity,
        tier,
        cart_id: cartId,
        cart_item_count: cart?.item_count ?? 0,
        cart_total: cart?.total ?? 0,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateItem: async (itemId, quantity) => {
    const cartId = getCartId();
    if (!cartId) return;
    set({ loading: true });
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
      await get().refreshCart();
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (itemId) => {
    const cartId = getCartId();
    if (!cartId) return;
    set({ loading: true });
    try {
      const res = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await get().refreshCart();
        whaletools.track("remove_from_cart", {
          item_id: itemId,
          cart_id: cartId,
          cart_item_count: get().cart?.item_count ?? 0,
          cart_total: get().cart?.total ?? 0,
        });
      }
    } finally {
      set({ loading: false });
    }
  },

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ cart: null, itemCount: 0 });
  },
}));
