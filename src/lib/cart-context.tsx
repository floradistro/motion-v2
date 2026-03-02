"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useCartStore, type CartStore } from "@/stores/cart-store";

// Thin wrapper around Zustand cart store for backwards compatibility.
// Components can use either useCart() or useCartStore() directly.

type CartContextValue = Pick<
  CartStore,
  "cart" | "loading" | "itemCount" | "addItem" | "updateItem" | "removeItem" | "refreshCart" | "clearCart"
>;

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const store = useCartStore();

  // Initialize cart on mount
  useEffect(() => {
    store.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: store.cart,
        loading: store.loading,
        itemCount: store.itemCount,
        addItem: store.addItem,
        updateItem: store.updateItem,
        removeItem: store.removeItem,
        refreshCart: store.refreshCart,
        clearCart: store.clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
