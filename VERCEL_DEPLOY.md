# Deploy Propel to Vercel - Step by Step

Your code is ready to deploy! Follow these steps to get your app live.

## Step 1: Create GitHub Account (if needed)

1. Go to https://github.com/signup
2. Create account with email
3. Verify email
4. Set up profile

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `propel`
3. Description: `Student Success Platform`
4. Choose: Public (easier) or Private
5. **Do NOT** initialize with README (we have one)
6. Click **"Create repository"**

## Step 3: Push Code to GitHub

Copy the commands shown on your new GitHub repo page, or use these:

```bash
cd /Users/skrishnamurthy26/Documents/website/propel

# Set your GitHub username and email
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/propel.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

⏳ Wait for the push to complete...

## Step 4: Deploy Frontend to Vercel

### Option A: Using Vercel Website (Easiest)

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel
4. Click **"Import Project"**
5. Paste your repo URL: `https://github.com/YOUR_USERNAME/propel`
6. Click **"Import"**
7. Configure:
   - **Root Directory:** Select `frontend`
   - **Environment Variables:** Add these:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```
   - Click **"Deploy"**

⏳ Vercel deploys (takes 2-5 minutes)

### Option B: Using Vercel CLI

```bash
npm i -g vercel

cd /Users/skrishnamurthy26/Documents/website/propel/frontend

vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? propel
# - In which directory is your code? ./
# - Want to modify vercel.json? No
# - Environment variables? (Add NEXT_PUBLIC_API_URL)
```

## Step 5: Verify Frontend Deploy

1. After deploy completes, you get a URL like: `https://propel-abc123.vercel.app`
2. Click the link or open in browser
3. You should see the **Propel landing page** ✅
4. Try clicking around, signing up, using the tools

## Step 6: Get Your Frontend URL

The URL will be shown as:
- Production: `https://propel-abc123.vercel.app`
- Copy this URL - you'll need it for the backend

## Step 7: Deploy Backend (Optional)

For now, the frontend will use `http://localhost:5000` for the backend.

To deploy the backend, you can use Railway:

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub"**
4. Authorize and select your `propel` repo
5. Railway auto-deploys the backend
6. Get your backend URL

Then update your frontend environment variable to the Railway URL.

## Testing Your Live App

1. **Visit your Vercel URL:** https://propel-abc123.vercel.app
2. **Create account:**
   - Email: `myemail@example.com`
   - Password: `mypassword123`
3. **Test each tool:**
   - College Calculator (SAT: 1400, GPA: 3.8)
   - AP Exam Prep (choose an FRQ, click hints)
   - Physics Simulator (adjust parameters)
   - Study Tool (flip cards, rate difficulty)

## Auto-Deployment

Now whenever you push code to GitHub:

```bash
git add .
git commit -m "Update: your change description"
git push origin main
```

✅ Vercel automatically deploys the new version!

## Custom Domain (Optional)

### Add Domain to Vercel

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Add your domain (e.g., `propel.com` or `app.propel.com`)
4. Follow DNS setup instructions
5. Your site is now at `https://propel.com`

## Environment Variables (Important)

When your backend is deployed, update the frontend environment variable:

**In Vercel Dashboard:**
1. Go to Project Settings
2. Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your backend URL
4. Vercel auto-redeploys

## Troubleshooting

### Frontend won't load
- Check browser console (F12) for errors
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Clear browser cache

### Can't sign up/login
- Backend URL might be wrong
- Check network tab (F12) for failed API calls
- Verify backend is running

### Page loads but tools don't work
- Check if backend API is reachable
- Look at browser console for error messages
- Verify all environment variables are set

## Performance Tips

1. **Images:** Vercel auto-optimizes images
2. **Caching:** Set cache headers in vercel.json
3. **Functions:** API routes auto-cold start (upgrade for faster)
4. **Analytics:** Enable in Vercel dashboard

## Security Checklist

- [ ] Don't commit `.env` files
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic)
- [ ] Set up GitHub branch protection
- [ ] Review who has access to Vercel project
- [ ] Monitor analytics for suspicious activity

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy frontend to Vercel
3. 📋 Deploy backend to Railway (see DEPLOYMENT.md)
4. 📋 Set up custom domain
5. 📋 Add real database
6. 📋 Enable analytics and monitoring

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Your GitHub Repo: https://github.com/YOUR_USERNAME/propel
- Propel App: https://propel-abc123.vercel.app

## Getting Help

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com

---

## Quick Command Reference

```bash
# Check git status
git status

# Make changes and push
git add .
git commit -m "Your message"
git push origin main

# View git log
git log --oneline

# Undo last commit (if needed)
git reset --soft HEAD~1
```

---

**You've deployed Propel to Vercel! 🎉**

Your app is now live and accessible to anyone with the URL!

Next: Deploy the backend to Railway (see DEPLOYMENT.md)
