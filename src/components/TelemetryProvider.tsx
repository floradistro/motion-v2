"use client";

import { WhaleTelemetry, WhaleErrorBoundary } from "@neowhale/telemetry/react";
import type { ReactNode } from "react";

export default function TelemetryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_WHALE_API_KEY;
  const storeId = process.env.NEXT_PUBLIC_WHALE_STORE_ID;

  // Skip telemetry if env vars missing (local dev without keys)
  if (!apiKey || !storeId) {
    return <>{children}</>;
  }

  return (
    <WhaleTelemetry
      apiKey={apiKey}
      storeId={storeId}
      serviceName="motion-store"
      serviceVersion="1.0.0"
      debug={process.env.NODE_ENV === "development"}
    >
      <WhaleErrorBoundary
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-zinc-400 mb-4">
                We&apos;ve been notified and are looking into it.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        }
      >
        {children}
      </WhaleErrorBoundary>
    </WhaleTelemetry>
  );
}
