"use client";

import { useEffect } from "react";
import { authStore } from "@/stores/auth-store";

export default function AuthInitializer() {
  useEffect(() => {
    authStore.getState().initialize();
  }, []);

  return null;
}
