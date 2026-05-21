# Complete Deployment Guide - Copy & Paste Steps

Deploy your Propel app in 15 minutes with these exact commands.

---

## STEP 1: Create GitHub Account (2 minutes)

### 1a. Go to GitHub signup
```
https://github.com/signup
```

### 1b. Fill in:
- **Email:** `az.sanjitk@gmail.com`
- **Password:** (Create a strong password - you'll need this!)
- **Username:** `sanjit-propel` (or whatever you want)

### 1c. Complete email verification
- Check your email (az.sanjitk@gmail.com)
- Click verification link
- Complete any additional steps

**✅ You now have a GitHub account!**

---

## STEP 2: Create GitHub Repository (1 minute)

### 2a. Go to create new repo
```
https://github.com/new
```

### 2b. Fill in:
- **Repository name:** `propel`
- **Description:** `Student Success Platform`
- **Visibility:** Public (for Vercel to work easier)
- **DO NOT** check "Initialize with README"

### 2c. Click "Create repository"

**✅ Your GitHub repo is created!**

**SAVE THIS URL:** You'll see something like:
```
https://github.com/YOUR_USERNAME/propel
```

---

## STEP 3: Configure Git Locally (1 minute)

Open Terminal and copy/paste these commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "az.sanjitk@gmail.com"
```

---

## STEP 4: Push Code to GitHub (2 minutes)

In Terminal, run these commands ONE AT A TIME:

```bash
cd /Users/skrishnamurthy26/Documents/website/propel
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/propel.git
```

⚠️ **REPLACE `YOUR_USERNAME` with your actual GitHub username!**

```bash
git branch -M main
```

```bash
git push -u origin main
```

**At this prompt, enter your GitHub credentials:**
- Username: `YOUR_USERNAME` (or your email)
- Password: (the password you created)

⏳ **Wait for push to complete** - you'll see:
```
Branch 'main' set up to track remote branch 'main' from origin.
```

**✅ Your code is now on GitHub!**

---

## STEP 5: Create Vercel Account (2 minutes)

### 5a. Go to Vercel signup
```
https://vercel.com/signup
```

### 5b. Click "Continue with GitHub"

### 5c. Authorize Vercel
- Click "Authorize vercel"
- Confirm with your GitHub password if needed

**✅ You now have a Vercel account!**

---

## STEP 6: Deploy to Vercel (5 minutes)

### 6a. Import your project
```
https://vercel.com/new
```

### 6b. Click "Import Project"

### 6c. Paste your GitHub repo URL
```
https://github.com/YOUR_USERNAME/propel
```

**REPLACE `YOUR_USERNAME` with your actual GitHub username!**

### 6d. Click "Import"

### 6e. Configure settings

**Root Directory:**
- Click the dropdown
- Select `frontend`
- Click to confirm

**Environment Variables:**
- Key: `NEXT_PUBLIC_API_URL`
- Value: `http://localhost:5000`
- Click "Add"

**Framework:**
- Should auto-detect "Next.js"
- Leave as-is

### 6f. Click "Deploy"

⏳ **Vercel deploys (3-5 minutes)**
- You'll see a progress bar
- Green checkmark when done

---

## STEP 7: Get Your Live URL ✅

After deployment completes, you'll see:

```
✓ Successfully deployed to:
  https://propel-abc123.vercel.app
```

**SAVE THIS URL!** This is your live website!

---

## STEP 8: Test Your Live App

1. **Open your Vercel URL** in browser
2. **You should see:**
   - Propel landing page
   - Feature cards
   - "Get Started" button
3. **Click "Sign Up"** and test:
   - Email: `test@example.com`
   - Password: `test123`
   - Verify you reach dashboard

**✅ Your app is LIVE!**

---

## Summary of What You Just Did

| Step | What | Time |
|------|------|------|
| 1 | Created GitHub account | 2 min |
| 2 | Created GitHub repo | 1 min |
| 3 | Configured git | 1 min |
| 4 | Pushed code to GitHub | 2 min |
| 5 | Created Vercel account | 2 min |
| 6 | Configured Vercel | 2 min |
| 7 | Waited for deploy | 5 min |
| 8 | Tested live app | 2 min |
| **TOTAL** | | **15-17 min** |

---

## Your Live Website

**Frontend:** https://propel-abc123.vercel.app
**GitHub Repo:** https://github.com/YOUR_USERNAME/propel
**Email Used:** az.sanjitk@gmail.com

---

## Next: Auto-Deploy Updates

From now on, whenever you update code:

```bash
cd /Users/skrishnamurthy26/Documents/website/propel
git add .
git commit -m "Your change description"
git push origin main
```

✅ **Vercel automatically redeploys!** (2-3 minutes)

---

## Troubleshooting

### "Repository not found"
- Make sure you created the GitHub repo first
- Check your username in the URL is correct
- Verify repo is public

### "Root Directory not found"
- Make sure you selected `frontend` (not `/frontend`)
- Click the folder icon to browse

### "Still building?"
- Deployment takes 3-5 minutes
- Refresh page after a few minutes

### "404 Error"
- Wait 5 minutes for Vercel to finish
- Clear browser cache (Cmd+Shift+R)
- Try incognito mode

### "API errors when trying tools"
- This is normal - backend isn't deployed yet
- All tools still work with mock data!

---

## Share Your App!

Once deployed, share with friends:

```
Check out my student success platform! 
https://propel-abc123.vercel.app
```

---

## Optional: Deploy Backend (Advanced)

See DEPLOYMENT.md if you want to deploy the Express backend to Railway.

For now, your frontend is **LIVE and WORKING** with mock data! 🎉

---

## Questions?

- **How do I update my app?** See "Auto-Deploy Updates" above
- **How do I add a custom domain?** See Vercel dashboard → Domains
- **How do I deploy the backend?** See DEPLOYMENT.md
- **Something's broken?** Check "Troubleshooting" above

---

**Congratulations! Your Propel platform is live on the internet! 🚀**

Next: Share your URL and celebrate! 🎉
