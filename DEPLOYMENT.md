# Propel Deployment Guide

Complete guide to deploying Propel to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway account (for backend)
- Domain name (optional)

## Local Setup Before Deployment

### 1. Initialize Git Repository

```bash
cd /Users/skrishnamurthy26/Documents/website/propel
git init
git add .
git commit -m "Initial Propel commit - complete platform"
git branch -M main
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Name: `propel`
3. Description: "Student Success Platform"
4. Make it Public or Private
5. Click "Create repository"

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/propel.git
git push -u origin main
```

## Frontend Deployment (Vercel)

### Step 1: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "GitHub" and authorize
4. Find and select your `propel` repository
5. Click "Import"

### Step 2: Configure Vercel

1. **Root Directory:** Select `frontend`
2. **Environment Variables:** Add
   ```
   NEXT_PUBLIC_API_URL=https://propel-api.railway.app
   ```
3. Click **Deploy**

### Step 3: Verify Frontend

- Vercel automatically deploys on push to main
- Visit your Vercel URL
- Frontend should be live

## Backend Deployment (Railway)

### Step 1: Connect Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize GitHub
5. Select `propel` repository
6. Click "Deploy Now"

### Step 2: Configure Backend

1. In Railway dashboard, go to your project
2. Click on the service
3. Go to **Variables** tab
4. Add environment variables:
   ```
   DB_USER=postgres
   DB_PASSWORD=<strong-password>
   DB_HOST=<railway-postgres-host>
   DB_PORT=5432
   DB_NAME=propel_db
   JWT_SECRET=<long-random-string>
   API_PORT=5000
   NODE_ENV=production
   ```

### Step 3: Add PostgreSQL

1. In Railway, click "Create" → "Database"
2. Select "PostgreSQL"
3. Copy connection details
4. Update backend variables with actual DB details

### Step 4: Deploy Backend

1. Railway auto-deploys on push
2. Check logs for errors
3. Your backend API URL: `https://propel-api.railway.app`

## Database Setup

### Option A: Railway PostgreSQL (Recommended)

1. Add PostgreSQL in Railway (see above)
2. Copy connection URL
3. Update backend `.env`
4. Database auto-migrates (if enabled)

### Option B: Self-Hosted PostgreSQL

1. Install PostgreSQL locally or use AWS RDS
2. Create database: `propel_db`
3. Update backend variables:
   ```env
   DB_HOST=your-db-host.com
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_NAME=propel_db
   ```
4. Run migrations (if available)

## Environment Variables Checklist

### Frontend (.env.local on Vercel)
```
NEXT_PUBLIC_API_URL=https://propel-api.railway.app
```

### Backend (.env on Railway)
```
DB_USER=postgres
DB_PASSWORD=<generate-strong-password>
DB_HOST=<railway-db-host>
DB_PORT=5432
DB_NAME=propel_db
JWT_SECRET=<generate-with: openssl rand -base64 32>
API_PORT=5000
NODE_ENV=production
```

## Custom Domain

### Frontend (Vercel)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions
5. Typical DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Backend (Railway)

1. Go to Railway project → Service settings
2. Custom Domain section
3. Add your domain (e.g., `api.yourdomain.com`)
4. Update DNS records

## Testing Production

1. **Frontend:** Visit your Vercel URL/custom domain
2. **Backend:** Test API endpoint:
   ```bash
   curl https://propel-api.railway.app/health
   ```
3. **Full Flow:** Sign up, use all tools

## Monitoring & Logs

### Vercel
- Dashboard shows deployments
- Click deployment to see logs
- Real-time errors in console

### Railway
- Project dashboard shows health
- Click service → Logs tab
- Monitor resource usage

## Continuous Deployment

Both Vercel and Railway auto-deploy on push to main:

```bash
# Make changes locally
git add .
git commit -m "Add feature"
git push origin main

# Automatically deploys to both platforms
```

## Rollback

### Vercel
1. Go to Deployments
2. Click previous deployment
3. Click "Redeploy"

### Railway
1. Go to Deployments
2. Click previous deployment
3. Click "Redeploy"

## SSL/HTTPS

✅ Automatic with both Vercel and Railway
- Free SSL certificates
- Auto-renewal

## Performance Optimization

### Frontend (Vercel)
- Image optimization enabled by default
- Code splitting automatic
- CDN distribution worldwide

### Backend (Railway)
- Use connection pooling
- Cache API responses
- Compress responses

## Cost Estimation

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | Free |
| Railway | Starter | ~$5-10/month |
| PostgreSQL | Shared | ~$10/month |
| Domain | - | ~$10-15/year |
| **Total** | - | **~$25-35/month** |

## Troubleshooting Deployment

### Frontend won't load
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Check backend is running
- Clear browser cache

### Backend API errors
- Check database connection
- Check environment variables
- Check Railway logs
- Verify migrations ran

### Database connection fails
- Verify connection string
- Check IP whitelist (if applicable)
- Test connection locally first

### CORS errors
- Verify backend has correct origin
- Check frontend URL matches env var
- Restart backend service

## Backup Strategy

1. **Database:** Railway auto-backups
2. **Code:** GitHub is your backup
3. **Files:** Add `.env` to `.gitignore` (already done)

## Security Checklist

- [ ] Change `JWT_SECRET` to random value
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic)
- [ ] Set proper CORS origins
- [ ] Don't commit `.env` files
- [ ] Enable GitHub branch protection
- [ ] Regular security updates

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy frontend to Vercel
3. ✅ Deploy backend to Railway
4. ✅ Add PostgreSQL database
5. ✅ Test full application
6. ✅ Set up custom domain
7. ✅ Monitor logs
8. ✅ Scale as needed

---

Your Propel platform is now live! 🚀
