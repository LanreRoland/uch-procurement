# UCH Procurement - Supabase Setup Complete

## ✅ Completed

- [x] `.env.local` created with your Supabase API credentials
- [x] Project URL: `https://lmzdxzcmjycbldnsdapl.supabase.co`
- [x] Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzI4OTIsImV4cCI6MjA5NjEwODg5Mn0.W8qFoswfoI9oGo-rpYuPTm1DlOr-v-Bmi3xKSKwGqQE`

## 🔄 Remaining Steps (5 minutes)

### Step 1: Create Database Table
1. Go to: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl/sql/new
2. Click in the SQL editor
3. **Copy and paste the following SQL exactly:**

```sql
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('tender', 'notice', 'award', 'advert')),
  summary text,
  body text,
  ref_no text,
  deadline timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table notices enable row level security;

create policy "Public can read published notices"
  on notices for select
  using (published = true);

create policy "Authenticated can manage notices"
  on notices for all
  using (auth.role() = 'authenticated');

create index idx_notices_type on notices (type);
create index idx_notices_published on notices (published);
create index idx_notices_created_at on notices (created_at desc);
create index idx_notices_deadline on notices (deadline);
```

4. Click **Run** (Ctrl + Enter)
5. You should see "Success. No rows returned" ✓

### Step 2: Create Admin Test User
1. Go to: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl/auth/users
2. Click **Add user** or **Create a new user**
3. Enter:
   - Email: `officer@uch.edu.ng` (or any test email)
   - Password: `TestPassword123!` (or secure password of your choice)
4. Click **Create user**

### Step 3: Test Locally
1. Open terminal in `C:\Users\USER\Lanre\uch Procurement`
2. Run: `npm run dev --turbopack`
3. Visit: http://localhost:3000
4. Verify home page loads with hero and notices section ✓
5. Click **Admin** in navbar → **Login**
6. Enter your test user credentials from Step 2
7. You should see the Admin Dashboard ✓
8. Click **Manage Notices** → **New Notice**
9. Fill in:
   - Title: "Test Tender Notice"
   - Type: "tender"
   - Summary: "This is a test"
   - Body: Add some text
   - Deadline: Pick a date
   - Published: Toggle ON
10. Click **Save Notice**
11. Visit http://localhost:3000/notices
12. Your notice should appear! ✓

### Step 4: Deploy (Optional)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add env vars to Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://lmzdxzcmjycbldnsdapl.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (your anon key from .env.local)
4. Deploy! 🚀

## 📂 What's Ready

- Next.js 15.3.3 app at `/uch Procurement/`
- All UI components and pages built
- Supabase integration configured
- Environment variables set in `.env.local`
- Build verified successful

## 🔗 Important URLs

- **Local Dev**: http://localhost:3000
- **Supabase Project**: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl
- **SQL Editor**: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl/sql
- **Auth Users**: https://supabase.com/dashboard/project/lmzdxzcmjycbldnsdapl/auth/users

## 📝 Notes

- The app is fully functional once the database table is created
- You can create as many procurement notices as needed
- All procurement officers login with the same credentials (or create more users)
- Notices can be draft (published=false) or public (published=true)
- The home page shows only published notices
- Admin can see and manage all notices

## ⚠️ Next Actions

1. **Immediate**: Follow Steps 1-2 above in Supabase dashboard
2. **Test**: Follow Step 3 to test locally
3. **Optional**: Follow Step 4 to deploy to Vercel

Questions? The application is ready for use once the database is set up!
