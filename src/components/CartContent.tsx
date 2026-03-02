"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartContent() {
  const { cart, loading, updateItem, removeItem, itemCount } = useCart();

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white/70">Cart</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
            Your Cart
          </h1>
          {!isEmpty && (
            <p className="text-sm text-white/50 mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </motion.div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-8 border border-white/[0.06] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-white mb-3">
              Your Mission Awaits.
            </h2>
            <p className="text-white/50 font-light mb-10 max-w-md mx-auto">
              Don&apos;t settle for less. Explore our nootropics and unlock your
              true cognitive potential.
            </p>
            <Link
              href="/shop"
              className="inline-block px-10 py-4 text-[12px] tracking-[0.2em] uppercase bg-white text-black hover:bg-cyan transition-all duration-300 font-medium"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart!.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-6 p-6 bg-[#0a0a0a] border border-white/[0.04]"
                >
                  <div className="w-20 h-20 bg-[#070707] flex-shrink-0 flex items-center justify-center border border-white/[0.04] overflow-hidden">
                    {item.featured_image ? (
                      <Image
                        src={item.featured_image}
                        alt={item.product_name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-[11px] text-white/40 uppercase tracking-wider">
                        {item.tier_label}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-light text-lg truncate">
                      {item.product_name}
                    </h3>
                    <p className="text-[12px] text-white/50 mt-1">
                      SKU: {item.sku}
                      {item.tier_label && ` / ${item.tier_label}`}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateItem(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          disabled={loading}
                          className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm text-white border-x border-white/10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItem(item.id, item.quantity + 1)
                          }
                          disabled={loading}
                          className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="text-[11px] tracking-wider uppercase text-white/40 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-light text-white">
                      ${item.line_total.toFixed(2)}
                    </p>
                    <p className="text-[12px] text-white/40 mt-1">
                      ${item.unit_price.toFixed(2)} each
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-32 p-8 bg-[#0a0a0a] border border-white/[0.04]"
              >
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-8">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-white">
                      ${cart!.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {cart!.discount_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Discount</span>
                      <span className="text-cyan">
                        -${cart!.discount_amount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Shipping</span>
                    <span className="text-white/60">
                      ${cart!.shipping_amount.toFixed(2)}
                    </span>
                  </div>
                  {cart!.tax_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Tax</span>
                      <span className="text-white">
                        ${cart!.tax_amount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.06] pt-6 mb-8">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-2xl font-light text-white">
                      ${cart!.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-5 text-[13px] tracking-[0.25em] uppercase bg-white text-black text-center font-medium hover:bg-cyan transition-all duration-300"
                >
                  Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block w-full py-4 mt-3 text-[12px] tracking-[0.2em] uppercase text-center text-white/50 hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
