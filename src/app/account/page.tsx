"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/hooks/use-auth";

interface OrderItem {
  product_name: string;
  quantity: number;
  line_total: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  items?: OrderItem[];
}

export default function AccountPage() {
  const router = useRouter();
  const { user, customer, loading, signOut } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (customer?.id) {
      fetch(`/api/account/orders?customer_id=${customer.id}`)
        .then((res) => (res.ok ? res.json() : { data: [] }))
        .then((data) => setOrders(data.data || data || []))
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    } else if (!loading) {
      setOrdersLoading(false);
    }
  }, [customer, loading]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
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

  if (!user) return null;

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const rewardPoints = customer?.reward_points ?? 0;

  const statusColor: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10",
    processing: "text-blue-400 bg-blue-400/10",
    shipped: "text-cyan bg-cyan/10",
    delivered: "text-green-400 bg-green-400/10",
    cancelled: "text-red-400 bg-red-400/10",
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12"
          >
            <div>
              <h1 className="text-3xl font-extralight tracking-tighter">
                {customer
                  ? `${customer.first_name} ${customer.last_name}`
                  : "My Account"}
              </h1>
              <p className="text-sm text-muted/50 font-light mt-1">
                {user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-[12px] tracking-[0.15em] uppercase text-muted/50 hover:text-white border border-white/[0.08] px-5 py-2.5 rounded-xl transition-colors self-start"
            >
              Sign Out
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {[
              { label: "Total Orders", value: orders.length.toString() },
              {
                label: "Total Spent",
                value: `$${totalSpent.toFixed(2)}`,
              },
              { label: "Reward Points", value: rewardPoints.toString() },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.04] bg-surface p-6"
              >
                <p className="text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-extralight tracking-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-muted/80 mb-6">
              Order History
            </h2>

            {ordersLoading ? (
              <p className="text-sm text-muted/50 font-light">
                Loading orders...
              </p>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.04] bg-surface p-12 text-center">
                <p className="text-sm text-muted/50 font-light mb-6">
                  No orders yet
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-white text-black text-[13px] tracking-[0.1em] uppercase px-8 py-3 rounded-xl hover:bg-cyan transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block rounded-2xl border border-white/[0.04] bg-surface p-5 hover:border-white/[0.08] transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-light text-white group-hover:text-cyan transition-colors">
                            #{order.order_number}
                          </p>
                          <p className="text-[12px] text-muted/40 font-light mt-0.5">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-[11px] tracking-[0.15em] uppercase px-3 py-1 rounded-full ${
                            statusColor[order.status] ||
                            "text-muted/50 bg-white/5"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-light text-white">
                          ${order.total?.toFixed(2)}
                        </span>
                        <svg
                          className="w-4 h-4 text-muted/30 group-hover:text-white transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
