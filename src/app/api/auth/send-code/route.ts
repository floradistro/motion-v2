import { NextResponse } from "next/server";

const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const res = await fetch(
    `${API_URL}/v1/stores/${STORE_ID}/storefront/auth/send-code`,
    {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!res.ok) {
    if (res.status === 429) {
      // Code was already sent recently — still valid, let client advance
      return NextResponse.json(
        { sent: true, rate_limited: true },
        { status: 200 }
      );
    }
    const data = await res.json().catch(() => ({}));
    const error = typeof data.error === "string" ? data.error : data.error?.message || data.message || "Failed to send code";
    return NextResponse.json(
      { error },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
