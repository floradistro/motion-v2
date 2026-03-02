import { NextResponse } from "next/server";

const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json(
      { error: "customer_id is required" },
      { status: 400 }
    );
  }

  // Fetch gateway customer + Supabase profile in parallel
  const [gatewayRes, profileRes] = await Promise.allSettled([
    fetch(
      `${API_URL}/v1/stores/${STORE_ID}/customers/${customerId}`,
      {
        headers: { "x-api-key": API_KEY },
        cache: "no-store",
      }
    ),
    fetch(
      `${SUPABASE_URL}/rest/v1/store_customer_profiles?customer_id=eq.${customerId}&select=*&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          apikey: SUPABASE_SERVICE_KEY,
        },
        cache: "no-store",
      }
    ),
  ]);

  // Extract gateway customer data
  let customer: Record<string, unknown> = {};
  if (gatewayRes.status === "fulfilled" && gatewayRes.value.ok) {
    customer = await gatewayRes.value.json();
  } else {
    return NextResponse.json(
      { error: "Customer not found" },
      { status: 404 }
    );
  }

  // Extract Supabase profile data (optional enrichment)
  let profile: Record<string, unknown> = {};
  if (profileRes.status === "fulfilled" && profileRes.value.ok) {
    const rows = await profileRes.value.json();
    if (Array.isArray(rows) && rows.length > 0) {
      profile = rows[0];
    }
  }

  // Merge into enriched response
  const enriched = {
    ...customer,
    loyalty_tier: profile.loyalty_tier ?? customer.loyalty_tier ?? null,
    average_order_value: profile.average_order_value ?? null,
    lifetime_points_earned: profile.lifetime_points_earned ?? customer.lifetime_points_earned ?? null,
    first_order_at: profile.first_order_at ?? null,
    member_since: customer.created_at ?? profile.created_at ?? null,
    total_spent: profile.total_spent ?? customer.total_spent ?? null,
    total_orders: profile.total_orders ?? customer.total_orders ?? null,
  };

  return NextResponse.json(enriched);
}
