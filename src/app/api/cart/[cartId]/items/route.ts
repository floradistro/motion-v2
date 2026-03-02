import { NextResponse } from "next/server";
import { addToCart } from "@/lib/api";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  const { cartId } = await params;
  const body = await req.json();
  const cart = await addToCart(
    cartId,
    body.product_id,
    body.quantity,
    body.tier,
    body.unit_price
  );
  if (!cart) return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  return NextResponse.json(cart);
}
