create table product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  product_slug text not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_id text,
  reviewer_name text not null,
  rating int not null check (rating >= 1 and rating <= 5),
  title text,
  body text not null,
  verified_purchase boolean default false,
  status text default 'approved',
  created_at timestamptz default now()
);

create index idx_reviews_product on product_reviews(product_slug, status, created_at desc);

alter table product_reviews enable row level security;

create policy "Public read" on product_reviews
  for select using (status = 'approved');

create policy "Auth insert" on product_reviews
  for insert to authenticated
  with check (auth.uid() = user_id);
