"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";

export default function CartDrawer() {
  const { cart, loading, itemCount, updateItem, removeItem, drawerOpen, closeDrawer } =
    useCartStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[420px] bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <h2 className="text-[13px] tracking-[0.25em] uppercase text-white font-medium">
                  Cart
                </h2>
                {itemCount > 0 && (
                  <span className="text-[11px] bg-cyan text-black px-2 py-0.5 font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            {isEmpty ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="w-16 h-16 mb-6 border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-light mb-2">Your cart is empty</p>
                <p className="text-white/40 text-[13px] font-light mb-8">Add some products to get started.</p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="px-8 py-3 text-[12px] tracking-[0.2em] uppercase bg-white text-black hover:bg-cyan transition-all duration-300 font-medium"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                {/* Items list — scrollable */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <div className="px-6 py-4 space-y-0 divide-y divide-white/[0.04]">
                    {cart!.items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-5 first:pt-2">
                        {/* Image */}
                        <div className="w-16 h-16 bg-[#070707] flex-shrink-0 border border-white/[0.04] overflow-hidden">
                          {item.featured_image ? (
                            <Image
                              src={item.featured_image}
                              alt={item.product_name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-white font-light truncate">
                            {item.product_name}
                          </p>
                          <p className="text-[11px] text-white/40 mt-0.5">
                            {item.tier_label && `${item.tier_label} · `}${item.unit_price.toFixed(2)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center border border-white/10">
                              <button
                                onClick={() =>
                                  item.quantity > 1
                                    ? updateItem(item.id, item.quantity - 1)
                                    : removeItem(item.id)
                                }
                                disabled={loading}
                                className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
                              >
                                -
                              </button>
                              <span className="w-8 h-7 flex items-center justify-center text-[12px] text-white border-x border-white/10">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateItem(item.id, item.quantity + 1)}
                                disabled={loading}
                                className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors text-sm"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={loading}
                              className="text-[10px] tracking-wider uppercase text-white/30 hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Line total */}
                        <p className="text-[14px] text-white font-light flex-shrink-0">
                          ${item.line_total.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer — totals + CTA */}
                <div className="border-t border-white/[0.06] px-6 py-5 space-y-4 bg-[#080808]">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-white">${cart!.subtotal.toFixed(2)}</span>
                  </div>
                  {cart!.shipping_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shipping</span>
                      <span className="text-white/60">${cart!.shipping_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-white/[0.06]">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-xl font-light text-white">${cart!.total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="block w-full py-4 text-[13px] tracking-[0.25em] uppercase bg-white text-black text-center font-medium hover:bg-cyan transition-all duration-300"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="block w-full py-2 text-[11px] tracking-[0.2em] uppercase text-center text-white/40 hover:text-white transition-colors"
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
