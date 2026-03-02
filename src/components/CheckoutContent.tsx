"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutContent() {
  const { cart, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<{
    id: string;
    order_number: string;
  } | null>(null);

  const isEmpty = !cart || cart.items.length === 0;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart) return;
    setProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cart.id,
          customer_email: email || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Checkout failed. Please try again.");
        return;
      }

      const data = await res.json();
      setOrder(data);
      clearCart();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Order confirmation
  if (order) {
    return (
      <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-4">
              Order Confirmed
            </h1>
            <p className="text-muted/50 font-light mb-2">
              Order #{order.order_number}
            </p>
            <p className="text-muted/40 font-light mb-12 max-w-md mx-auto">
              Thank you for your order. You&apos;ll receive a confirmation
              email shortly.
            </p>
            <Link
              href="/shop"
              className="inline-block px-10 py-4 text-[12px] tracking-[0.2em] uppercase bg-white text-black hover:bg-cyan transition-all duration-300 font-medium"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center py-20">
          <h1 className="text-3xl font-light text-white mb-4">
            Nothing to check out
          </h1>
          <p className="text-muted/40 font-light mb-8">
            Add some products to your cart first.
          </p>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 text-[12px] tracking-[0.2em] uppercase bg-white text-black hover:bg-cyan transition-all duration-300 font-medium"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <nav className="flex items-center gap-2 text-[12px] text-muted/40 mb-8">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-white transition-colors">
              Cart
            </Link>
            <span>/</span>
            <span className="text-muted/60">Checkout</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white">
            Secure Your Upgrade.
          </h1>
          <p className="text-muted/40 font-light mt-2">
            Your information is 100% secure. Fast, encrypted checkout for total
            peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleCheckout} className="space-y-8">
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-muted/50 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#0a0a0a] border border-white/[0.06] text-white text-sm px-5 py-4 placeholder:text-muted/20 focus:outline-none focus:border-white/20 transition-colors"
                />
                <p className="text-[11px] text-muted/30 mt-2">
                  Order confirmation will be sent to this email.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={processing || !email}
                className="w-full py-5 text-[13px] tracking-[0.25em] uppercase bg-white text-black font-medium hover:bg-cyan transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {processing ? "Processing..." : `Place Order - $${cart.total.toFixed(2)}`}
              </button>
            </form>
          </motion.div>

          {/* Order Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-32 p-8 bg-[#0a0a0a] border border-white/[0.04]">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-muted/50 mb-6">
                Order Review
              </h3>

              <div className="space-y-4 mb-8">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-12 bg-[#070707] flex-shrink-0 border border-white/[0.04] overflow-hidden">
                      {item.featured_image ? (
                        <Image
                          src={item.featured_image}
                          alt={item.product_name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-muted/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex justify-between">
                      <div>
                        <p className="text-white font-light truncate">
                          {item.product_name}
                        </p>
                        <p className="text-[12px] text-muted/30">
                          {item.tier_label} x {item.quantity}
                        </p>
                      </div>
                      <span className="text-white font-light flex-shrink-0 ml-3">
                        ${item.line_total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted/50">Subtotal</span>
                  <span className="text-white">
                    ${cart.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted/50">Shipping</span>
                  <span className="text-muted/50">
                    ${cart.shipping_amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/[0.06]">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-light text-white">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
