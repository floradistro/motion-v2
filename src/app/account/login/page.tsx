"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authStore } from "@/stores/auth-store";

type Step = "email" | "code" | "profile";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await authStore.getState().sendCode(email);
    setLoading(false);
    if (result.success) {
      setStep("code");
    } else {
      setError(result.error || "Failed to send code");
    }
  };

  const submitCode = useCallback(
    async (digits: string[]) => {
      const fullCode = digits.join("");
      if (fullCode.length !== 6) return;
      setError("");
      setLoading(true);
      const result = await authStore.getState().verifyCode(email, fullCode);
      setLoading(false);
      if (result.success) {
        if (result.needsProfile) {
          setStep("profile");
        } else {
          router.push("/account");
        }
      } else {
        setError(result.error || "Invalid code");
        setCode(["", "", "", "", "", ""]);
        codeRefs.current[0]?.focus();
      }
    },
    [email, router]
  );

  const handleCodeInput = (index: number, value: string) => {
    // Handle paste
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (index + i < 6) newCode[index + i] = d;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      codeRefs.current[nextIndex]?.focus();
      if (newCode.every((d) => d !== "")) {
        submitCode(newCode);
      }
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== "")) {
      submitCode(newCode);
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await authStore.getState().updateProfile(firstName, lastName);
    setLoading(false);
    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Failed to save profile");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-extralight tracking-tighter mb-2">
                  Sign in
                </h1>
                <p className="text-sm text-muted/50 font-light mb-10">
                  Enter your email to receive a sign-in code
                </p>

                <form onSubmit={handleSendCode} className="space-y-6">
                  <div>
                    <label className="text-[11px] tracking-[0.25em] uppercase text-muted/80 block mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      placeholder="you@example.com"
                      className="w-full bg-surface border border-white/[0.04] rounded-xl px-4 py-3.5 text-sm font-light text-white placeholder:text-muted/30 outline-none focus:border-cyan/50 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 font-light">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-white text-black text-[13px] tracking-[0.1em] uppercase py-3.5 rounded-xl hover:bg-cyan hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Continue"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-extralight tracking-tighter mb-2">
                  Check your email
                </h1>
                <p className="text-sm text-muted/50 font-light mb-10">
                  We sent a 6-digit code to{" "}
                  <span className="text-white">{email}</span>
                </p>

                <div className="flex gap-3 mb-6 justify-center">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        codeRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleCodeInput(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      autoFocus={i === 0}
                      className="w-12 h-14 bg-surface border border-white/[0.04] rounded-xl text-center text-lg font-light text-white outline-none focus:border-cyan/50 transition-colors"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-sm text-red-400 font-light text-center mb-4">
                    {error}
                  </p>
                )}

                {loading && (
                  <p className="text-sm text-muted/50 font-light text-center mb-4">
                    Verifying...
                  </p>
                )}

                <button
                  onClick={() => {
                    setStep("email");
                    setCode(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  className="text-sm text-muted/50 hover:text-white font-light transition-colors w-full text-center"
                >
                  Use a different email
                </button>
              </motion.div>
            )}

            {step === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-extralight tracking-tighter mb-2">
                  Welcome
                </h1>
                <p className="text-sm text-muted/50 font-light mb-10">
                  Complete your profile to get started
                </p>

                <form onSubmit={handleProfile} className="space-y-6">
                  <div>
                    <label className="text-[11px] tracking-[0.25em] uppercase text-muted/80 block mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoFocus
                      className="w-full bg-surface border border-white/[0.04] rounded-xl px-4 py-3.5 text-sm font-light text-white placeholder:text-muted/30 outline-none focus:border-cyan/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.25em] uppercase text-muted/80 block mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full bg-surface border border-white/[0.04] rounded-xl px-4 py-3.5 text-sm font-light text-white placeholder:text-muted/30 outline-none focus:border-cyan/50 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 font-light">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !firstName || !lastName}
                    className="w-full bg-white text-black text-[13px] tracking-[0.1em] uppercase py-3.5 rounded-xl hover:bg-cyan hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : "Get Started"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
