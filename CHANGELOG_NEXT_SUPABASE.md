# Next steps implemented in this push

This commit integrates Supabase auth, profile upsert, product CRUD endpoints, and client-side image upload flow.

What to do next after pulling these changes:
- Create the following in your Supabase project:
  - profiles table (id uuid primary key, email text, full_name text, avatar_url text, role text default 'buyer', created_at timestamptz default now())
  - products table (id uuid primary key default gen_random_uuid(), seller_id uuid references profiles(id), title text, description text, price integer, currency text default 'USD', images text[], status text default 'pending', created_at timestamptz default now())
  - Storage bucket: product-images (public or set appropriate policies)
- Add values to .env.local (see .env.example)
- Ensure SUPABASE_SERVICE_ROLE_KEY is configured in .env.local for server APIs

Notes:
- Admin user must have role='admin' in profiles to access /api/users and to be able to grant sellers.
- Currency is fixed to USD in product creation.
