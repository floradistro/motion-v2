"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/hooks/use-auth";

interface OrderItem {
  id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  tier_label?: string;
}

interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}

const STEPS = ["pending", "processing", "shipped", "delivered"];

function ProgressTracker({ status }: { status: string }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-light transition-colors ${
                  isCompleted
                    ? "bg-cyan text-black"
                    : "bg-surface border border-white/[0.08] text-muted/40"
                } ${isCurrent ? "ring-2 ring-cyan/30" : ""}`}
              >
                {isCompleted && i < currentIndex ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[10px] tracking-[0.15em] uppercase mt-2 ${
                  isCompleted ? "text-white" : "text-muted/30"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-[1px] mx-2 mt-[-18px] ${
                  i < currentIndex ? "bg-cyan" : "bg-white/[0.06]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, customer, loading } = useAuthStore();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (customer?.id) {
      fetch(`/api/account/orders?customer_id=${customer.id}`)
        .then((res) => (res.ok ? res.json() : { data: [] }))
        .then((data) => {
          const all: OrderDetail[] = data.data || data || [];
          const found = all.find((o) => o.id === params.id);
          setOrder(found || null);
        })
        .catch(() => setOrder(null))
        .finally(() => setOrderLoading(false));
    } else if (!loading) {
      setOrderLoading(false);
    }
  }, [customer, loading, params.id]);

  if (loading || orderLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="text-sm text-muted/50 font-light">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted/50 font-light mb-6">
              Order not found
            </p>
            <Link
              href="/account"
              className="text-sm text-cyan hover:text-white font-light transition-colors"
            >
              Back to Account
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[12px] text-muted/40 font-light mb-10"
          >
            <Link href="/account" className="hover:text-white transition-colors">
              Account
            </Link>
            <span>/</span>
            <span className="text-white">Order #{order.order_number}</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-extralight tracking-tighter mb-1">
              Order #{order.order_number}
            </h1>
            <p className="text-sm text-muted/50 font-light">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.04] bg-surface p-8 mb-6"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-6">
              Fulfillment Status
            </p>
            <ProgressTracker status={order.status} />
          </motion.div>

          {/* Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/[0.04] bg-surface p-6 mb-6"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-5">
              Items
            </p>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
                >
                  <div>
                    <p className="text-sm font-light text-white">
                      {item.product_name}
                    </p>
                    <p className="text-[12px] text-muted/40 font-light mt-0.5">
                      {item.tier_label ? `${item.tier_label} ` : ""}Qty:{" "}
                      {item.quantity} @ ${item.unit_price?.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-light text-white">
                    ${item.line_total?.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/[0.04] bg-surface p-6 mb-10"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-5">
              Summary
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-light">
                <span className="text-muted/50">Subtotal</span>
                <span className="text-white">
                  ${order.subtotal?.toFixed(2)}
                </span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-sm font-light">
                  <span className="text-muted/50">Discount</span>
                  <span className="text-green-400">
                    -${order.discount_amount?.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-light">
                <span className="text-muted/50">Shipping</span>
                <span className="text-white">
                  {order.shipping_amount > 0
                    ? `$${order.shipping_amount.toFixed(2)}`
                    : "Free"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span className="text-muted/50">Tax</span>
                <span className="text-white">
                  ${order.tax_amount?.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-white/[0.04] pt-3 flex justify-between">
                <span className="text-sm font-light text-white">Total</span>
                <span className="text-lg font-extralight text-white">
                  ${order.total?.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Back link */}
          <Link
            href="/account"
            className="text-sm text-muted/50 hover:text-white font-light transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Account
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
