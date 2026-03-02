import { NextResponse } from "next/server";

const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const res = await fetch(
    `${API_URL}/v1/stores/${STORE_ID}/customers?email=${encodeURIComponent(email)}`,
    {
      headers: { "x-api-key": API_KEY },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Customer not found" },
      { status: res.status }
    );
  }

  const data = await res.json();
  // API may return array or single object
  const customer = Array.isArray(data) ? data[0] : data.data?.[0] || data;
  if (!customer || !customer.id) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
  return NextResponse.json(customer);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${API_URL}/v1/stores/${STORE_ID}/customers`,
    {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: data.error || "Failed to create customer" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { customer_id, ...updates } = body;

  if (!customer_id) {
    return NextResponse.json(
      { error: "customer_id is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${API_URL}/v1/stores/${STORE_ID}/customers/${customer_id}`,
    {
      method: "PATCH",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: data.error || "Failed to update customer" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
