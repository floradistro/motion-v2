import { NextResponse } from "next/server";

const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/storefront/auth/verify-code`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: body.email, code: body.code }),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[verify-code] CAUGHT ERROR:", err);
    return NextResponse.json(
      { error: { message: "Failed to verify code" } },
      { status: 500 }
    );
  }
}
