/**
 * Seed product reviews into Supabase.
 *
 * Usage:
 *   npx tsx scripts/seed-reviews.ts
 *
 * Requires env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const SEED_REVIEWS = [
  {
    product_id: "",
    product_slug: "mint-pouches",
    reviewer_name: "Alex T.",
    rating: 5,
    title: "Replaced my morning coffee",
    body: "I was skeptical about pouches but these actually work. The mint flavor is clean, not overpowering. I get about 3 hours of solid focus without the jitters I used to get from espresso. Game changer for my morning routine.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-12-15T10:00:00Z",
  },
  {
    product_id: "",
    product_slug: "mint-pouches",
    reviewer_name: "Jordan K.",
    rating: 5,
    title: "Perfect for long study sessions",
    body: "Finals week was a breeze. Pop one in before a study session and I'm locked in for hours. The theanine really smooths everything out — no crash, no anxiety. Just clean, calm focus.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-11-28T14:30:00Z",
  },
  {
    product_id: "",
    product_slug: "mint-pouches",
    reviewer_name: "Sam R.",
    rating: 4,
    title: "Great product, wish they lasted longer",
    body: "Flavor and effect are both excellent. My only wish is that the focus lasted a bit longer — I usually need to re-up after about 2.5 hours. But the quality is there. Will keep buying.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-10-05T09:15:00Z",
  },
  {
    product_id: "",
    product_slug: "mango-pouches",
    reviewer_name: "Priya M.",
    rating: 5,
    title: "Mango is incredible",
    body: "Best flavor in the lineup hands down. It tastes like actual mango, not that artificial candy stuff. And the nootropic blend hits just right. I keep a tin at my desk and one in my bag.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-12-20T16:45:00Z",
  },
  {
    product_id: "",
    product_slug: "mango-pouches",
    reviewer_name: "Chris D.",
    rating: 4,
    title: "Solid daily driver",
    body: "I've tried a lot of focus supplements and most of them are overhyped. This actually delivers. The mango flavor is a nice bonus. I use one every morning before work and it sets me up perfectly.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-11-12T08:00:00Z",
  },
  {
    product_id: "",
    product_slug: "mango-pouches",
    reviewer_name: "Taylor W.",
    rating: 5,
    title: "Converted from energy drinks",
    body: "Used to go through 2-3 energy drinks a day. These pouches give me the same energy without all the sugar and bloating. Mango flavor is addictive in the best way. My wallet and my body thank me.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-09-30T11:20:00Z",
  },
  {
    product_id: "",
    product_slug: "blue-raspberry-pouches",
    reviewer_name: "Morgan L.",
    rating: 5,
    title: "Blue razz hits different",
    body: "If you grew up on blue raspberry anything, you need these. The flavor is nostalgic but the formula is cutting edge. I use them for gaming sessions and my reaction time is noticeably better.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-12-08T20:30:00Z",
  },
  {
    product_id: "",
    product_slug: "blue-raspberry-pouches",
    reviewer_name: "Dev P.",
    rating: 4,
    title: "Fun flavor, real results",
    body: "Bought these as a novelty but the effects are legit. Clean focus for a few hours, no crash. The blue raspberry is sweet but not cloying. Alternating between this and mint now.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-11-02T13:00:00Z",
  },
  {
    product_id: "",
    product_slug: "blue-raspberry-pouches",
    reviewer_name: "Riley S.",
    rating: 5,
    title: "Best nootropic I've tried",
    body: "I've been through the whole stack — modafinil, racetams, you name it. This is the first thing that gives me consistent, clean focus without side effects. The blue razz flavor makes it enjoyable too.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-10-18T07:45:00Z",
  },
  {
    product_id: "",
    product_slug: "limitless-capsules",
    reviewer_name: "Jamie H.",
    rating: 5,
    title: "The capsules are next level",
    body: "If the pouches are the daily driver, these capsules are the rocket fuel. I take them on days when I really need to perform — presentations, deadline days, big creative sessions. The difference is undeniable.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-12-22T09:00:00Z",
  },
  {
    product_id: "",
    product_slug: "limitless-capsules",
    reviewer_name: "Casey N.",
    rating: 4,
    title: "Potent formula",
    body: "These are strong. I'd recommend starting with one capsule instead of two if you're new to nootropics. Once you find your dose, the focus and clarity are phenomenal. Great for deep work blocks.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-11-20T15:30:00Z",
  },
  {
    product_id: "",
    product_slug: "limitless-capsules",
    reviewer_name: "Quinn B.",
    rating: 5,
    title: "Worth every penny",
    body: "Expensive? A little. Worth it? Absolutely. I was spending more on coffee and energy drinks per month anyway. These capsules give me 4-5 hours of real, productive focus. My work output has genuinely improved.",
    verified_purchase: true,
    status: "approved",
    created_at: "2025-10-25T12:00:00Z",
  },
];

async function seed() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  console.log(`Seeding ${SEED_REVIEWS.length} reviews...`);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/product_reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      apikey: SUPABASE_SERVICE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(SEED_REVIEWS),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to seed: ${res.status} ${text}`);
    process.exit(1);
  }

  const inserted = await res.json();
  console.log(`Successfully seeded ${inserted.length} reviews.`);
}

seed();
