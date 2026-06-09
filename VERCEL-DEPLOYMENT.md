# 🚀 Vercel Deployment Guide

Your code is ready to deploy! Follow these steps:

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `uch-procurement`
3. **Description**: "UCH Procurement Portal - Federal Ministry Tender Management"
4. Select **Public** (for Vercel)
5. Click **Create repository**

## Step 2: Push Code to GitHub

After creating the repo, you'll see commands to run. Run these in your terminal:

```powershell
cd "C:\Users\USER\Lanre\uch Procurement"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/uch-procurement.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Paste: `https://github.com/YOUR-USERNAME/uch-procurement.git`
4. Click **Continue**
5. **Project name**: `uch-procurement`
6. Click **Deploy**

### Add Environment Variables (Important!)

After clicking Deploy, Vercel will ask for environment variables:

Add these:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://lmzdxzcmjycbldnsdapl.supabase.co`

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemR4emNtanljYmxkbnNkYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzI4OTIsImV4cCI6MjA5NjEwODg5Mn0.W8qFoswfoI9oGo-rpYuPTm1DlOr-v-Bmi3xKSKwGqQE`

Then click **Deploy**!

---

## 🎉 Your App Will Be Live!

You'll get a Vercel URL like: `https://uch-procurement.vercel.app`

### After Deployment:

1. Visit your live URL
2. Go to admin login: `https://your-url.vercel.app/admin/login`
3. Use credentials:
   - Email: `test.officer@gmail.com`
   - Password: `TestPassword123!`

### Before Testing Admin:
⚠️ **Don't forget**: Disable email confirmation in Supabase (see TESTING-GUIDE.md)

---

## ✅ Deployment Checklist

- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Vercel project imported
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Live URL working
- [ ] Admin login tested
- [ ] First notice created and published

---

**Questions?** Check TESTING-GUIDE.md for more info.
