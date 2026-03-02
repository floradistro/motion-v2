import { createStore } from "zustand/vanilla";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  reward_points?: number;
}

export interface AuthState {
  user: User | null;
  customer: Customer | null;
  loading: boolean;
}

export interface AuthActions {
  sendCode: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyCode: (
    email: string,
    code: string
  ) => Promise<{
    success: boolean;
    needsProfile: boolean;
    error?: string;
  }>;
  updateProfile: (
    firstName: string,
    lastName: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  setCustomer: (customer: Customer | null) => void;
}

export type AuthStore = AuthState & AuthActions;

export const authStore = createStore<AuthStore>((set, get) => ({
  user: null,
  customer: null,
  loading: true,

  sendCode: async (email: string) => {
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        const msg = typeof data.error === "string" ? data.error : data.error?.message || data.message || "Failed to send code";
        return { success: false, error: msg };
      }
      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  },

  verifyCode: async (email: string, code: string) => {
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = typeof data.error === "string" ? data.error : data.error?.message || data.message || "Verification failed";
        return {
          success: false,
          needsProfile: false,
          error: msg,
        };
      }

      // Establish Supabase session with token_hash from gateway
      const supabase = createClient();
      const { error: authError } = await supabase.auth.verifyOtp({
        token_hash: data.token_hash,
        type: "magiclink",
      });

      if (authError) {
        return {
          success: false,
          needsProfile: false,
          error: authError.message,
        };
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      set({ user });

      if (data.customer) {
        set({ customer: data.customer });
      }

      return {
        success: true,
        needsProfile: data.needs_profile ?? false,
      };
    } catch {
      return {
        success: false,
        needsProfile: false,
        error: "Network error",
      };
    }
  },

  updateProfile: async (firstName: string, lastName: string) => {
    const { customer, user } = get();
    const email = customer?.email || user?.email;
    if (!email) return { success: false, error: "No email found" };

    try {
      // Try to find existing customer first
      const findRes = await fetch(
        `/api/account/customer?email=${encodeURIComponent(email)}`
      );
      let customerId: string | undefined;
      if (findRes.ok) {
        const found = await findRes.json();
        customerId = found.id;
      }

      let res: Response;
      if (customerId) {
        res = await fetch("/api/account/customer", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: customerId,
            first_name: firstName,
            last_name: lastName,
          }),
        });
      } else {
        res = await fetch("/api/account/customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
          }),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        const msg = typeof data.error === "string" ? data.error : data.error?.message || data.message || "Failed to update";
        return { success: false, error: msg };
      }

      const updatedCustomer = await res.json();
      set({ customer: updatedCustomer });
      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, customer: null });
  },

  initialize: async () => {
    const supabase = createClient();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        set({ user });
        // Fetch customer record
        if (user.email) {
          try {
            const res = await fetch(
              `/api/account/customer?email=${encodeURIComponent(user.email)}`
            );
            if (res.ok) {
              const customer = await res.json();
              set({ customer });
            }
          } catch {
            // Customer not found — that's okay
          }
        }
      }
    } finally {
      set({ loading: false });
    }
  },

  setCustomer: (customer) => set({ customer }),
}));

// Selectors
export const selectUser = (state: AuthStore) => state.user;
export const selectCustomer = (state: AuthStore) => state.customer;
export const selectIsAuthenticated = (state: AuthStore) => !!state.user;
