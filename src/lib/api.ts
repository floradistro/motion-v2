const API_URL = process.env.WHALE_API_URL!;
const API_KEY = process.env.WHALE_API_KEY!;
const STORE_ID = process.env.WHALE_STORE_ID!;

// ── Types ──────────────────────────────────────────────

export interface PricingTier {
  id: string;
  unit: string;
  label: string;
  price: number;
  enabled: boolean;
  quantity: number;
  sale_price?: number;
  regular_price?: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  short_description?: string;
  featured_image: string;
  image_gallery?: string[];
  featured: boolean;
  status: string;
  primary_category_id?: string;
  pricing_data: {
    mode: string;
    tiers: PricingTier[];
  };
  custom_fields?: {
    badge?: string;
    flavor?: string;
    tagline?: string;
    benefits?: string;
    highlights?: string;
    flavor_color?: string;
    model_3d_url?: string;
    compare_price?: number;
    long_description?: string;
    usage_instructions?: string;
    subscription_discount?: number;
    serving_size?: string;
    [key: string]: unknown;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  availability?: {
    location_id: string;
    location_name: string;
    in_stock: boolean;
    quantity: number;
  }[];
}

export interface CartItem {
  object: string;
  id: string;
  product_id: string;
  product_name: string;
  sku: string;
  unit_price: number;
  quantity: number;
  tier_quantity: number;
  tier_label: string;
  line_total: number;
  discount_amount: number;
  featured_image?: string;
}

export interface Cart {
  object: string;
  id: string;
  store_id: string;
  location_id: string;
  customer_id: string | null;
  status: string;
  subtotal: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  item_count: number;
  shipping_amount: number;
  expires_at: string;
  items: CartItem[];
}

export interface Order {
  object: string;
  id: string;
  order_number: string;
  status: string;
  payment_method: string;
}

export interface Model3D {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_size: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  rating: number;
  title: string | null;
  review_text: string;
  verified_purchase: boolean;
  helpful_count: number;
  metadata: {
    reviewer_name?: string;
    reviewer_role?: string;
  };
  created_at: string;
  product_name?: string;
  product_slug?: string;
  flavor_color?: string;
}

// ── Supabase ───────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function get3DModels(): Promise<Model3D[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/store_media?store_id=eq.${STORE_ID}&source=eq.blender-export&status=eq.active&select=id,title,file_name,file_url,file_size&order=created_at.asc`,
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          apikey: SUPABASE_SERVICE_KEY,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const rows: {
      id: string;
      title: string | null;
      file_name: string;
      file_url: string;
      file_size: number;
    }[] = await res.json();

    return rows.map((r) => ({
      id: r.id,
      title: r.title || r.file_name,
      file_name: r.file_name,
      file_url: r.file_url,
      file_size: r.file_size,
    }));
  } catch {
    return [];
  }
}

// ── Reviews ───────────────────────────────────────────

export async function getProductReviews(): Promise<ProductReview[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/product_reviews?store_id=eq.${STORE_ID}&status=eq.approved&select=id,product_id,rating,title,review_text,verified_purchase,helpful_count,metadata,created_at,products(name,slug,custom_fields)&order=helpful_count.desc,created_at.desc`,
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          apikey: SUPABASE_SERVICE_KEY,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const rows = await res.json();
    return rows.map(
      (r: {
        id: string;
        product_id: string;
        rating: number;
        title: string | null;
        review_text: string;
        verified_purchase: boolean;
        helpful_count: number;
        metadata: Record<string, string>;
        created_at: string;
        products?: {
          name: string;
          slug: string;
          custom_fields?: { flavor_color?: string };
        };
      }) => ({
        id: r.id,
        product_id: r.product_id,
        rating: r.rating,
        title: r.title,
        review_text: r.review_text,
        verified_purchase: r.verified_purchase,
        helpful_count: r.helpful_count,
        metadata: r.metadata || {},
        created_at: r.created_at,
        product_name: r.products?.name,
        product_slug: r.products?.slug,
        flavor_color: r.products?.custom_fields?.flavor_color,
      })
    );
  } catch {
    return [];
  }
}

// ── Products ───────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/products?limit=100`,
      {
        headers: { "x-api-key": API_KEY },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || json.products || [];
  } catch (err) {
    console.error("Products fetch error:", err);
    return [];
  }
}

// ── Categories ─────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

/** Derive unique categories from products. */
export function extractCategories(products: Product[]): Category[] {
  const seen = new Map<string, Category>();
  for (const p of products) {
    if (p.category && !seen.has(p.category.id)) {
      seen.set(p.category.id, {
        id: p.category.id,
        name: p.category.name,
        slug: p.category.slug,
        description: "",
      });
    }
  }
  return Array.from(seen.values());
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/products/${id}`,
      {
        headers: { "x-api-key": API_KEY },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── Cart ───────────────────────────────────────────────

export async function createCart(customerEmail?: string): Promise<Cart | null> {
  try {
    const body: Record<string, string> = {};
    if (customerEmail) body.customer_email = customerEmail;

    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/cart`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/cart/${cartId}`,
      {
        headers: { "x-api-key": API_KEY },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function addToCart(
  cartId: string,
  productId: string,
  quantity: number,
  tier?: string,
  unitPrice?: number
): Promise<Cart | null> {
  try {
    const body: Record<string, unknown> = {
      product_id: productId,
      quantity,
    };
    if (tier) body.tier = tier;
    if (unitPrice !== undefined) body.unit_price = unitPrice;

    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/cart/${cartId}/items`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateCartItem(
  cartId: string,
  itemId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/cart/${cartId}/items/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function removeCartItem(
  cartId: string,
  itemId: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/cart/${cartId}/items/${itemId}`,
      {
        method: "DELETE",
        headers: { "x-api-key": API_KEY },
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

// ── Checkout ───────────────────────────────────────────

export async function checkout(
  cartId: string,
  customerEmail?: string
): Promise<Order | null> {
  try {
    const body: Record<string, string> = { cart_id: cartId };
    if (customerEmail) body.customer_email = customerEmail;

    const res = await fetch(
      `${API_URL}/v1/stores/${STORE_ID}/checkout`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
