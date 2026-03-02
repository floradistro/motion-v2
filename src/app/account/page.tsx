"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/hooks/use-auth";
import { useCart } from "@/lib/cart-context";

// ── Types ─────────────────────────────────────────────

interface OrderItem {
  id?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  unit_price?: number;
  line_total: number;
  tier_label?: string;
  featured_image?: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  items?: OrderItem[];
  tracking_number?: string;
  tracking_url?: string;
  carrier?: string;
  shipped_at?: string;
}

interface EnrichedCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  reward_points?: number;
  loyalty_tier?: string;
  average_order_value?: number;
  lifetime_points_earned?: number;
  first_order_at?: string;
  member_since?: string;
  total_spent?: number;
  total_orders?: number;
}

// ── Constants ─────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10",
  processing: "text-blue-400 bg-blue-400/10",
  shipped: "text-cyan bg-cyan/10",
  in_transit: "text-cyan bg-cyan/10",
  delivered: "text-green-400 bg-green-400/10",
  completed: "text-green-400 bg-green-400/10",
  cancelled: "text-red-400 bg-red-400/10",
};

const FILTER_OPTIONS = ["All", "Processing", "Shipped", "Delivered", "Completed"] as const;

const PROGRESS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"] as const;

const ACTIVE_STATUSES = new Set(["processing", "shipped", "in_transit"]);

// ── Skeleton Components ───────────────────────────────

function SkeletonCard() {
  return (
    <div className="border border-white/[0.04] bg-surface p-6 animate-pulse">
      <div className="h-3 w-20 bg-white/[0.06] mb-3" />
      <div className="h-7 w-16 bg-white/[0.06]" />
    </div>
  );
}

function SkeletonOrderRow() {
  return (
    <div className="border border-white/[0.04] bg-surface p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/[0.06]" />
          <div>
            <div className="h-4 w-32 bg-white/[0.06] mb-2" />
            <div className="h-3 w-20 bg-white/[0.06]" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-5 w-16 bg-white/[0.06]" />
          <div className="h-4 w-14 bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

// ── Progress Tracker ──────────────────────────────────

function ShipmentTracker({ status }: { status: string }) {
  const normalized = status.toLowerCase().replace(/_/g, "");
  const stepMap: Record<string, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    intransit: 2,
    delivered: 3,
  };
  const currentIndex = stepMap[normalized] ?? 0;

  return (
    <div className="flex items-center gap-0 w-full">
      {PROGRESS_STEPS.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-light transition-colors ${
                  isCompleted
                    ? "bg-cyan text-black"
                    : "bg-surface border border-white/[0.08] text-white/50"
                } ${isCurrent ? "ring-2 ring-cyan/30" : ""}`}
              >
                {isCompleted && i < currentIndex ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[9px] tracking-[0.12em] uppercase mt-1.5 ${
                  isCompleted ? "text-white" : "text-white/40"
                }`}
              >
                {step}
              </span>
            </div>
            {i < PROGRESS_STEPS.length - 1 && (
              <div
                className={`flex-1 h-[1px] mx-1.5 mt-[-16px] ${
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

// ── Main Page ─────────────────────────────────────────

export default function AccountPage() {
  const router = useRouter();
  const { user, customer, loading, signOut, updateProfile } = useAuthStore();
  const { addItem } = useCart();

  const [enriched, setEnriched] = useState<EnrichedCustomer | null>(null);
  const [enrichedLoading, setEnrichedLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [editing, setEditing] = useState(false);
  const [editFirst, setEditFirst] = useState("");
  const [editLast, setEditLast] = useState("");
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);

  // Auth redirect
  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/login");
    }
  }, [loading, user, router]);

  // Fetch enriched customer
  useEffect(() => {
    if (!customer?.id) {
      if (!loading) setEnrichedLoading(false);
      return;
    }
    fetch(`/api/account/dashboard?customer_id=${customer.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setEnriched(data);
      })
      .catch(() => {})
      .finally(() => setEnrichedLoading(false));
  }, [customer, loading]);

  // Fetch orders
  useEffect(() => {
    if (!customer?.id) {
      if (!loading) setOrdersLoading(false);
      return;
    }
    fetch(`/api/account/orders?customer_id=${customer.id}`)
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((data) => setOrders(data.data || data || []))
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [customer, loading]);

  // Derived data
  const displayCustomer = enriched || customer;
  const totalSpent = enriched?.total_spent ?? orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const rewardPoints = displayCustomer?.reward_points ?? 0;
  const avgOrderValue =
    enriched?.average_order_value ??
    (orders.length > 0 ? totalSpent / orders.length : 0);

  const activeOrders = useMemo(
    () => orders.filter((o) => ACTIVE_STATUSES.has(o.status)),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    if (filter === "All") return orders;
    return orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());
  }, [orders, filter]);

  const memberSince = enriched?.member_since || enriched?.first_order_at;

  // Handlers
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleEditStart = () => {
    setEditFirst(displayCustomer?.first_name || "");
    setEditLast(displayCustomer?.last_name || "");
    setEditing(true);
  };

  const handleEditSave = async () => {
    setSaving(true);
    const result = await updateProfile(editFirst, editLast);
    if (result.success) {
      setEnriched((prev) =>
        prev ? { ...prev, first_name: editFirst, last_name: editLast } : prev
      );
      setEditing(false);
    }
    setSaving(false);
  };

  const handleReorder = async (order: Order) => {
    if (!order.items?.length) return;
    setReordering(order.id);
    try {
      for (const item of order.items) {
        if (item.product_id) {
          await addItem(item.product_id, item.quantity);
        }
      }
      router.push("/cart");
    } catch {
      setReordering(null);
    }
  };

  const formatOrderSummary = (items?: OrderItem[]) => {
    if (!items?.length) return "Order items";
    const first = items[0].product_name;
    if (items.length === 1) return first;
    return `${first} + ${items.length - 1} more`;
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="text-sm text-white/60 font-light">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* ─── Section 1: Profile Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-12"
          >
            <div className="flex-1">
              {editing ? (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={editFirst}
                      onChange={(e) => setEditFirst(e.target.value)}
                      placeholder="First name"
                      className="bg-surface border border-white/[0.08] px-4 py-2.5 text-sm font-light text-white placeholder:text-white/40 focus:outline-none focus:border-cyan/30 w-full"
                    />
                    <input
                      type="text"
                      value={editLast}
                      onChange={(e) => setEditLast(e.target.value)}
                      placeholder="Last name"
                      className="bg-surface border border-white/[0.08] px-4 py-2.5 text-sm font-light text-white placeholder:text-white/40 focus:outline-none focus:border-cyan/30 w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditSave}
                      disabled={saving}
                      className="text-[12px] tracking-[0.15em] uppercase bg-cyan text-black px-5 py-2 hover:bg-cyan/80 transition-colors disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="text-[12px] tracking-[0.15em] uppercase text-white/60 hover:text-white px-5 py-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-light tracking-tighter">
                      Welcome back, {displayCustomer?.first_name || "there"}
                    </h1>
                    {enriched?.loyalty_tier && (
                      <span className="text-[10px] tracking-[0.15em] uppercase bg-cyan/15 text-cyan border border-cyan/20 px-3 py-1 rounded-full">
                        {enriched.loyalty_tier}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <p className="text-sm text-white/60 font-light">
                      {user.email}
                    </p>
                    {memberSince && (
                      <span className="text-[11px] text-white/40 font-light">
                        Member since{" "}
                        {new Date(memberSince).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleEditStart}
                    className="text-[12px] text-white/50 hover:text-cyan font-light mt-2 transition-colors"
                  >
                    Edit profile
                  </button>
                </>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="text-[12px] tracking-[0.15em] uppercase text-white/60 hover:text-white border border-white/[0.08] px-5 py-2.5 transition-colors self-start"
            >
              Sign Out
            </button>
          </motion.div>

          {/* ─── Section 2: Stats Grid ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {enrichedLoading || ordersLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {/* Total Orders */}
                <div className="border border-white/[0.04] bg-surface p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                      Orders
                    </p>
                  </div>
                  <p className="text-2xl font-light tracking-tight">
                    {enriched?.total_orders ?? orders.length}
                  </p>
                </div>

                {/* Total Spent */}
                <div className="border border-white/[0.04] bg-surface p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                      Spent
                    </p>
                  </div>
                  <p className="text-2xl font-light tracking-tight">
                    ${totalSpent.toFixed(2)}
                  </p>
                </div>

                {/* Reward Points */}
                <div className="border border-white/[0.04] bg-surface p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                      Points
                    </p>
                  </div>
                  <p className="text-2xl font-light tracking-tight number-glow text-cyan">
                    {rewardPoints}
                  </p>
                </div>

                {/* Avg Order Value */}
                <div className="border border-white/[0.04] bg-surface p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                      Avg Order
                    </p>
                  </div>
                  <p className="text-2xl font-light tracking-tight">
                    ${avgOrderValue.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </motion.div>

          {/* ─── Section 3: Active Shipments ─── */}
          {!ordersLoading && activeOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-12"
            >
              <h2 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-4">
                Active Shipments
              </h2>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-white/[0.04] bg-surface p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div>
                        <p className="text-sm font-light text-white">
                          Order #{order.order_number}
                        </p>
                        <p className="text-[12px] text-white/50 font-light mt-0.5">
                          {formatOrderSummary(order.items)}
                        </p>
                      </div>
                      {order.tracking_number && (
                        <div className="text-right">
                          {order.tracking_url ? (
                            <a
                              href={order.tracking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[12px] text-cyan hover:text-white font-light transition-colors"
                            >
                              {order.carrier ? `${order.carrier}: ` : ""}
                              {order.tracking_number}
                            </a>
                          ) : (
                            <p className="text-[12px] text-white/60 font-light">
                              {order.carrier ? `${order.carrier}: ` : ""}
                              {order.tracking_number}
                            </p>
                          )}
                          {order.shipped_at && (
                            <p className="text-[11px] text-white/40 font-light mt-0.5">
                              Shipped{" "}
                              {new Date(order.shipped_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <ShipmentTracker status={order.status} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Section 4: Order History ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                Order History
              </h2>
              {orders.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilter(opt)}
                      className={`text-[11px] tracking-[0.12em] uppercase px-3.5 py-1.5 transition-colors ${
                        filter === opt
                          ? "bg-cyan/15 text-cyan border border-cyan/20"
                          : "text-white/50 hover:text-white border border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {ordersLoading ? (
              <div className="space-y-3">
                <SkeletonOrderRow />
                <SkeletonOrderRow />
                <SkeletonOrderRow />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="border border-white/[0.04] bg-surface p-12 text-center">
                <p className="text-sm text-white/60 font-light mb-6">
                  {filter !== "All" ? `No ${filter.toLowerCase()} orders` : "No orders yet"}
                </p>
                {filter === "All" && (
                  <Link
                    href="/shop"
                    className="inline-block bg-white text-black text-[13px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-cyan transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-white/[0.04] bg-surface hover:border-white/[0.08] transition-colors group"
                  >
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="flex items-center justify-between p-5"
                    >
                      <div className="flex items-center gap-4">
                        {order.items?.[0]?.featured_image ? (
                          <div className="w-12 h-12 overflow-hidden bg-white/[0.04] flex-shrink-0">
                            <Image
                              src={order.items[0].featured_image}
                              alt={order.items[0].product_name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-light text-white group-hover:text-cyan transition-colors">
                            {formatOrderSummary(order.items)}
                          </p>
                          <p className="text-[12px] text-white/50 font-light mt-0.5">
                            #{order.order_number} &middot;{" "}
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-[11px] tracking-[0.15em] uppercase px-3 py-1 hidden sm:inline-block ${
                            STATUS_COLORS[order.status] || "text-white/60 bg-white/5"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-light text-white">
                          ${order.total?.toFixed(2)}
                        </span>
                        <svg
                          className="w-4 h-4 text-white/40 group-hover:text-white transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </Link>
                    {order.items?.some((i) => i.product_id) && (
                      <div className="px-5 pb-4 -mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReorder(order);
                          }}
                          disabled={reordering === order.id}
                          className="text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-cyan transition-colors disabled:opacity-50"
                        >
                          {reordering === order.id ? "Adding to cart..." : "Reorder"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ─── Section 5: Loyalty & Rewards ─── */}
          {!enrichedLoading && !ordersLoading && rewardPoints > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-12"
            >
              <h2 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-4">
                Loyalty & Rewards
              </h2>
              <div className="border border-white/[0.04] bg-surface p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-4xl font-light tracking-tight number-glow text-cyan">
                      {rewardPoints.toLocaleString()}
                    </p>
                    <p className="text-[12px] text-white/60 font-light mt-1">
                      Reward Points
                    </p>
                  </div>
                  {enriched?.loyalty_tier && (
                    <div className="flex-1">
                      <p className="text-sm font-light text-white mb-2">
                        {enriched.loyalty_tier} Tier
                      </p>
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (rewardPoints / (rewardPoints + 500)) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-white/40 font-light mt-1.5">
                        {enriched.lifetime_points_earned?.toLocaleString() ?? rewardPoints.toLocaleString()} lifetime points earned
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Section 6: Quick Actions ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Reorder Last */}
              {orders.length > 0 && orders[0]?.items?.some((i) => i.product_id) ? (
                <button
                  onClick={() => handleReorder(orders[0])}
                  disabled={reordering === orders[0].id}
                  className="border border-white/[0.04] bg-surface p-6 hover:border-white/[0.08] transition-colors text-left group"
                >
                  <svg className="w-5 h-5 text-white/40 group-hover:text-cyan transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  <p className="text-sm font-light text-white group-hover:text-cyan transition-colors">
                    {reordering === orders[0].id ? "Adding..." : "Reorder Last"}
                  </p>
                  <p className="text-[11px] text-white/40 font-light mt-1">
                    #{orders[0].order_number}
                  </p>
                </button>
              ) : (
                <div className="border border-white/[0.04] bg-surface p-6 opacity-40">
                  <svg className="w-5 h-5 text-white/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  <p className="text-sm font-light text-white/60">Reorder Last</p>
                  <p className="text-[11px] text-white/30 font-light mt-1">No orders yet</p>
                </div>
              )}

              {/* Browse Shop */}
              <Link
                href="/shop"
                className="border border-white/[0.04] bg-surface p-6 hover:border-white/[0.08] transition-colors group"
              >
                <svg className="w-5 h-5 text-white/40 group-hover:text-cyan transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.997 2.997 0 00.38-.205l5.37-3.834a1.5 1.5 0 011.5 0l5.37 3.834c.126.09.248.187.38.205" />
                </svg>
                <p className="text-sm font-light text-white group-hover:text-cyan transition-colors">
                  Browse Shop
                </p>
                <p className="text-[11px] text-white/40 font-light mt-1">
                  Explore products
                </p>
              </Link>

              {/* Get Support */}
              <a
                href="mailto:support@motionpouches.com"
                className="border border-white/[0.04] bg-surface p-6 hover:border-white/[0.08] transition-colors group"
              >
                <svg className="w-5 h-5 text-white/40 group-hover:text-cyan transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-sm font-light text-white group-hover:text-cyan transition-colors">
                  Get Support
                </p>
                <p className="text-[11px] text-white/40 font-light mt-1">
                  Email us
                </p>
              </a>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
