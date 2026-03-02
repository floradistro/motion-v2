import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET /api/reviews?product_id=X
export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("product_id");
  if (!productId) {
    return NextResponse.json({ error: "product_id required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/product_reviews?product_id=eq.${encodeURIComponent(productId)}&status=eq.approved&select=id,product_id,rating,title,review_text,verified_purchase,helpful_count,metadata,created_at&order=helpful_count.desc,created_at.desc&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          apikey: SUPABASE_SERVICE_KEY,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }

    const reviews = await res.json();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await req.json();
  const { product_id, rating, title, body: reviewBody, reviewer_name, customer_id } = body;

  if (!product_id || !rating || !reviewBody || !reviewer_name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
  }

  // Check for duplicate review by same user on same product
  const dupCheck = await fetch(
    `${SUPABASE_URL}/rest/v1/product_reviews?store_id=eq.58e62e61-75d1-4a79-8bed-3a3fb8f9400d&product_id=eq.${encodeURIComponent(product_id)}&metadata->>reviewer_name=eq.${encodeURIComponent(reviewer_name)}&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        apikey: SUPABASE_SERVICE_KEY,
      },
    }
  );

  if (dupCheck.ok) {
    const existing = await dupCheck.json();
    if (existing.length > 0) {
      return NextResponse.json({ error: "You already reviewed this product" }, { status: 409 });
    }
  }

  // Insert review
  const insertRes = await fetch(
    `${SUPABASE_URL}/rest/v1/product_reviews`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        apikey: SUPABASE_SERVICE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        product_id,
        store_id: "58e62e61-75d1-4a79-8bed-3a3fb8f9400d",
        customer_id: customer_id || null,
        reviewer_name,
        rating,
        title: title || null,
        review_text: reviewBody,
        verified_purchase: !!customer_id,
        status: "approved",
        metadata: { reviewer_name: reviewer_name },
      }),
    }
  );

  if (!insertRes.ok) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }

  const [review] = await insertRes.json();
  return NextResponse.json(review, { status: 201 });
}
