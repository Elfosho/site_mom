# Feature branch: Next.js + Tailwind scaffold

This branch (feature/marketplace-mvp) contains a starter Next.js app with Tailwind and simple pages/components for the Mama's Crafts marketplace.

What is included:
- Next.js scaffold (pages router)
- TailwindCSS configuration
- Pages: index, shop, product, seller dashboard, admin dashboard
- Components: Header, Footer, ProductCard, ProductForm, AdminUserList, SellerProductsList
- API route: /api/grant-seller (example server-side handler that updates `profiles` table using SUPABASE_SERVICE_ROLE_KEY)
- lib/supabaseClient.js — client-side supabase helper

How to run locally:
1. git clone git@github.com:Elfosho/site_mom.git
2. git checkout feature/marketplace-mvp
3. cp .env.example .env.local and fill your keys
4. npm install
5. npm run dev

Next steps I'll implement:
- Connect client components to Supabase for auth, product CRUD and image storage
- Implement real users listing for admin and secure the admin routes
- Add Stripe checkout
- Polish UI and add responsive images/illustrations

If you'd like any changes to the admin workflow (e.g. automatic seller approval, email notifications), tell me and I'll include them.
