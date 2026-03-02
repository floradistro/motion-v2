import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const LOGO_URL =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/vendor-logos/motion-pouches/logo.png";

// Lifestyle hero images per product slug prefix — cinematic, high-res
const LIFESTYLE_HEROES: Record<string, string> = {
  mint: "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/ab695158-1a3a-4bb6-ae4a-ea729a5bb90e.jpg",
  mango: "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/477cd688-5eab-4b94-a2ad-0ec725e15053.jpg",
  "blue-raspberry": "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/1808c5a9-d04b-4f42-bbea-8c1fb8b84069.jpg",
  limitless: "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/a4412aaa-645f-451d-ac45-4a7a960fe92f.jpg",
};

// Default hero — athlete training (used for homepage/shop)
const DEFAULT_HERO =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/b5261e04-16a7-4ff8-ab3c-cb71f36f69de.png";

function getHeroForSlug(slug: string): string {
  for (const [prefix, url] of Object.entries(LIFESTYLE_HEROES)) {
    if (slug.startsWith(prefix)) return url;
  }
  return DEFAULT_HERO;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "MOTION";
  const price = searchParams.get("price");
  const tagline = searchParams.get("tagline") || "";
  const slug = searchParams.get("slug") || "";
  const product_image = searchParams.get("image");

  // Pick the right lifestyle background
  const heroUrl = slug ? getHeroForSlug(slug) : DEFAULT_HERO;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Full-bleed lifestyle background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroUrl}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Heavy gradient overlay — dark from bottom + left for text legibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
            display: "flex",
          }}
        />

        {/* Product image floating on right side */}
        {product_image && (
          <div
            style={{
              position: "absolute",
              right: 60,
              bottom: 40,
              display: "flex",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product_image}
              alt=""
              width={280}
              height={280}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
              }}
            />
          </div>
        )}

        {/* Top bar: Logo + site URL */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px 50px",
          }}
        >
          {/* MOTION logo image */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt="MOTION"
              height={36}
              style={{ filter: "brightness(10)" }}
            />
          </div>

          {/* Site URL badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              motionpouches.com
            </div>
          </div>
        </div>

        {/* Bottom content area */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            padding: "0 50px 44px",
            gap: 12,
          }}
        >
          {/* Product name */}
          <div
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: product_image ? 750 : 1000,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </div>

          {/* Tagline */}
          {tagline && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: product_image ? 650 : 900,
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              {tagline}
            </div>
          )}

          {/* Price + CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 8,
            }}
          >
            {price && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 24px",
                  background: "rgba(34,211,238,0.15)",
                  border: "1px solid rgba(34,211,238,0.3)",
                  borderRadius: 100,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: "rgba(34,211,238,0.8)",
                    textTransform: "uppercase" as const,
                  }}
                >
                  From
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#22d3ee",
                  }}
                >
                  ${price}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase" as const,
                }}
              >
                Shop Now
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
