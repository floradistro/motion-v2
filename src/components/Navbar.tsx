"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { selectIsAuthenticated } from "@/stores/auth-store";

const LOGO_URL =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/vendor-logos/motion-pouches/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const isAuthed = useAuth(selectIsAuthenticated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/">
            <Image
              src={LOGO_URL}
              alt="MOTION"
              width={120}
              height={48}
              className="object-contain h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/shop"
              className="text-[12px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              Shop
            </Link>
            <Link
              href="/#science"
              className="text-[12px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              Science
            </Link>
            <Link
              href="/#about"
              className="text-[12px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              About
            </Link>

            {/* Account */}
            <Link
              href={isAuthed ? "/account" : "/account/login"}
              className="relative text-muted hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {isAuthed && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#050505]" />
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-muted hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
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
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/shop"
              className="text-[12px] tracking-[0.2em] uppercase bg-white text-black px-7 py-3 hover:bg-cyan hover:text-black transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile: Cart + Toggle */}
          <div className="flex md:hidden items-center gap-5">
            <Link href="/cart" className="relative text-muted hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
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
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`w-6 h-[1px] bg-white transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`w-6 h-[1px] bg-white transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.04]"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/#science"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Science
              </Link>
              <Link
                href="/#about"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href={isAuthed ? "/account" : "/account/login"}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-2"
              >
                Account
                {isAuthed && (
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                )}
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="text-[13px] tracking-[0.15em] uppercase bg-white text-black px-6 py-4 text-center hover:bg-cyan transition-all"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
