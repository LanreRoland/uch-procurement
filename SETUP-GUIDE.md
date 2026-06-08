# UCH Procurement Portal - Setup Guide

## Prerequisites
- Node.js 18+ (you have v22.17.1 ✓)
- npm 9+ ✓
- A Supabase account (free tier is sufficient)

## Step 1: Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and log in
2. Create a new project:
   - Organization: Create new or select existing
   - Project Name: `uch-procurement` (or similar)
   - Database Password: Create a strong password
   - Region: Choose closest to Nigeria (e.g., `eu-west-1` for Europe, or create via CLI for other regions)
3. Wait for the project to initialize (2-3 minutes)

## Step 2: Create Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `SUPABASE-SCHEMA.sql` from this repository
4. Paste into the SQL Editor
5. Click **Run** (or press `Ctrl+Enter`)
6. Verify the output shows:
   ```
   Success. No rows returned
   ```

## Step 3: Get Your API Credentials

1. In Supabase, go to **Settings** → **API**
2. Under "Project API keys", you'll find:
   - **Project URL**: Copy this
   - **Anon Key** (public): Copy this
3. Open `.env.local` in your project root (created automatically)
4. Fill in the values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 4: Set Up Authentication (Optional but Recommended)

### Option A: Email + Password Auth (Recommended)
1. In Supabase, go to **Authentication** → **Providers**
2. Email provider is enabled by default
3. Go to **Settings** → **Auth Settings**
4. Scroll to "Email Rate Limit" - adjust if needed (default: 3 emails/minute)
5. Optional: Set "Email Confirmations" to require email verification

### Option B: Magic Links (Password-Free)
1. In Supabase, go to **Authentication** → **Providers** → **Email**
2. Toggle "Enable Confirmations" ON
3. Users will receive magic links instead of password prompts

### Option C: Google OAuth (Enterprise Feature)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project, enable Google+ API
3. Create OAuth 2.0 credentials (type: Web application)
4. Add redirect URI: `https://yoursupabaseproject.supabase.co/auth/v1/callback`
5. In Supabase → Authentication → Providers → Google, paste credentials

## Step 5: Create Your First Procurement Officer Account

In Supabase **Authentication** → **Users**, manually create a test user:
- Email: `officer@uch.edu.ng` (or your email)
- Password: Set a strong password
- Click **Create User**

Or allow sign-ups on the login page and approve them via Supabase dashboard.

## Step 6: Test Locally

```bash
cd "C:\Users\USER\Lanre\uch Procurement"
npm run dev
```

Visit:
- **Public site**: http://localhost:3000
- **Admin login**: http://localhost:3000/admin/login
- **Admin dashboard**: http://localhost:3000/admin (after login)

## Step 7: Create a Test Notice

1. Log in at http://localhost:3000/admin/login
2. Go to Admin → Notices → New Notice
3. Fill in form:
   - Title: "Invitation to Tender - Medical Supplies"
   - Type: "Tender"
   - Ref No: "UCH/PROC/2025/001"
   - Summary: "Supply of essential medical equipment"
   - Deadline: Pick a date in the future
   - Content: Write some procurement details
   - Published: Toggle ON
4. Click "Create Notice"
5. Visit http://localhost:3000 to see it on the home page

## Step 8: Deploy to Vercel (Optional)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: UCH Procurement Portal"
   git remote add origin https://github.com/yourusername/uch-procurement.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and connect your GitHub repo

3. In Vercel project settings, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key

4. Deploy! Your site will be live at `https://yourdomain.vercel.app`

## Troubleshooting

### "Supabase connection error"
- Verify `.env.local` has correct credentials
- Check Supabase project is active (not paused)
- Restart dev server: `npm run dev`

### "Authentication failed"
- Ensure user exists in Supabase → Authentication → Users
- Check RLS policies in `SUPABASE-SCHEMA.sql` are applied
- Try incognito/private browser tab

### "Notices table not found"
- Run the SQL schema again from `SUPABASE-SCHEMA.sql`
- Check for error messages in Supabase SQL Editor

### "Port 3000 already in use"
- Use `npm run dev -- -p 3001` for a different port
- Or: `npx kill-port 3000` to free it up

## Project Structure

```
uch Procurement/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── notices/
│   │   ├── page.tsx             # Notices listing
│   │   └── [id]/page.tsx        # Notice detail
│   └── admin/
│       ├── layout.tsx           # Admin layout
│       ├── login/page.tsx       # Login page
│       ├── page.tsx             # Dashboard
│       ├── logout/route.ts      # Logout handler
│       └── notices/
│           ├── page.tsx         # Admin notices list
│           ├── new/page.tsx     # Create notice
│           └── [id]/
│               ├── edit/page.tsx    # Edit notice
│               └── delete/page.tsx  # Delete notice
├── components/
│   ├── Navbar.tsx               # Top navigation
│   ├── Footer.tsx               # Footer
│   ├── NoticeCard.tsx           # Notice card component
│   └── NoticeForm.tsx           # Form for create/edit
├── lib/
│   └── supabase/
│       ├── client.ts            # Browser Supabase client
│       └── server.ts            # Server Supabase client
├── middleware.ts                # Admin route protection
├── public/
│   └── uch-procurement-logo.svg # UCH logo
├── tailwind.config.ts           # Tailwind config (UCH colors)
├── next.config.ts               # Next.js config
└── package.json                 # Dependencies
```

## Key Technologies

- **Next.js 15** (App Router, Server Components)
- **TypeScript** (type-safe development)
- **Tailwind CSS** (responsive design with UCH brand colors)
- **Supabase** (PostgreSQL database + auth)
- **TipTap** (rich text editor for notices)
- **lucide-react** (beautiful icons)

## Support & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Public Procurement Act 2007 (Nigeria)](http://www.bpp.gov.ng/)
