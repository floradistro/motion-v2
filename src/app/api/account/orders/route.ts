import { NextResponse } from "next/server";

const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json(
      { error: "customer_id is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${API_URL}/v1/stores/${STORE_ID}/orders?customer_id=${encodeURIComponent(customerId)}`,
    {
      headers: { "x-api-key": API_KEY },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
