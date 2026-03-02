import { NextResponse } from "next/server";
import { checkout } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const order = await checkout(body.cart_id, body.customer_email);
  if (!order) return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  return NextResponse.json(order);
}
