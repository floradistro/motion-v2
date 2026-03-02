import { NextResponse } from "next/server";
import { createCart } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const cart = await createCart(body.customer_email);
  if (!cart) return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
  return NextResponse.json(cart);
}
