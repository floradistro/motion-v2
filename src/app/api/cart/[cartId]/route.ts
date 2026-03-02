import { NextResponse } from "next/server";
import { getCart } from "@/lib/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  const { cartId } = await params;
  const cart = await getCart(cartId);
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  return NextResponse.json(cart);
}
