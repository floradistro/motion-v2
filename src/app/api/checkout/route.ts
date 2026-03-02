import { NextResponse } from "next/server";
import { checkout } from "@/lib/api";
import { reportServerError } from "@neowhale/telemetry/server";

const telemetryConfig = {
  apiKey: process.env.WHALE_API_KEY || "",
  storeId: process.env.WHALE_STORE_ID || "",
  serviceName: "motion-store-server",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = await checkout(body.cart_id, body.customer_email);
    if (!order) return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    return NextResponse.json(order);
  } catch (error) {
    await reportServerError(error as Error, telemetryConfig, {
      route: "POST /api/checkout",
    });
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
