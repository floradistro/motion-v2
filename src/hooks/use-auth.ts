import { useSyncExternalStore, useCallback } from "react";
import { authStore, type AuthStore } from "@/stores/auth-store";

export function useAuth<T>(selector: (state: AuthStore) => T): T {
  const getSnapshot = useCallback(() => selector(authStore.getState()), [selector]);
  return useSyncExternalStore(authStore.subscribe, getSnapshot, getSnapshot);
}

export function useAuthStore() {
  return {
    user: useAuth((s) => s.user),
    customer: useAuth((s) => s.customer),
    loading: useAuth((s) => s.loading),
    sendCode: authStore.getState().sendCode,
    verifyCode: authStore.getState().verifyCode,
    updateProfile: authStore.getState().updateProfile,
    signOut: authStore.getState().signOut,
    initialize: authStore.getState().initialize,
  };
}
