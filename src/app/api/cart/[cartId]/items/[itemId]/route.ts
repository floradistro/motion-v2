import { NextResponse } from "next/server";
import { updateCartItem, removeCartItem } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cartId: string; itemId: string }> }
) {
  const { cartId, itemId } = await params;
  const body = await req.json();
  const cart = await updateCartItem(cartId, itemId, body.quantity);
  if (!cart) return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  return NextResponse.json(cart);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ cartId: string; itemId: string }> }
) {
  const { cartId, itemId } = await params;
  const ok = await removeCartItem(cartId, itemId);
  if (!ok) return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  return NextResponse.json({ success: true });
}
