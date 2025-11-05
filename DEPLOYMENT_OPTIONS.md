# Deployment Options

## 🚀 Recommended: Deploy to Vercel (Best for Next.js)

Vercel is the company that created Next.js and offers the best experience:

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Set Root Directory to `apps/web`
6. Deploy!

**It's free and takes 2 minutes!**

Vercel will automatically:
- Build your Next.js app
- Provide HTTPS
- Give you a URL like: `your-app.vercel.app`
- Auto-deploy on every push

### Step 3: Deploy Backend Services

**Option A: Railway.app** (Easiest, Free tier)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Deploy each service:
   - Auth Service (Port 4001)
   - Project Service (Port 4002)
   - Paper Service (Port 4003)
   - Dataset Service (Port 4004)
4. Add databases from Railway's templates

**Option B: Render.com** (Free tier)
1. Go to [render.com](https://render.com)
2. Connect GitHub
3. Create Web Services for each backend
4. Add PostgreSQL and MongoDB from Render

**Option C: Fly.io** (Developer-friendly)
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy each service
cd apps/auth-service
fly launch

cd ../project-service
fly launch
# etc...
```

---

## 📄 Alternative: GitHub Pages (Static Only)

**⚠️ Important Limitations:**
- Only works for static sites
- No backend APIs
- No authentication
- No database
- Only frontend HTML/CSS/JS

If you still want to use GitHub Pages for a demo:

### Setup GitHub Pages:

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: GitHub Actions
   - Save

2. **Push the deployment workflow:**
```bash
git add .github/workflows/deploy-pages.yml
git commit -m "Add GitHub Pages deployment"
git push origin claude/ai-researcher-platform-011CUqJ9ftQzAkb7KsBPVePR
```

3. **Wait for deployment:**
   - Go to Actions tab in GitHub
   - Watch the deployment progress
   - Your site will be at: `https://USERNAME.github.io/REPO-NAME`

4. **Update Next.js config:**
   - Edit `apps/web/next.config.js`
   - Set `basePath: '/your-repo-name'`
   - Commit and push

---

## 🌐 Full Production Deployment

For a complete production setup with all services:

### Option 1: AWS
- Frontend: S3 + CloudFront
- Backend: ECS or EKS
- Databases: RDS, DocumentDB
- Storage: S3

### Option 2: Google Cloud Platform
- Frontend: Cloud Run
- Backend: Cloud Run / GKE
- Databases: Cloud SQL, Firestore
- Storage: Cloud Storage

### Option 3: DigitalOcean
- App Platform for frontend
- Kubernetes for backend
- Managed Databases
- Spaces for storage

---

## 💡 My Recommendation

**For getting online quickly:**

1. **Vercel** for frontend (Next.js) - 2 minutes, free
2. **Railway** for backend + databases - 10 minutes, free tier
3. Done! Your app is live with a real URL

**For serious production:**
1. **Vercel** for frontend
2. **AWS/GCP** for backend with Kubernetes
3. Proper CI/CD pipelines
4. Monitoring and logging

---

## 🎯 Quickest Path to Live Demo

```bash
# 1. Create Vercel account and install CLI
npm i -g vercel

# 2. Deploy frontend
cd apps/web
vercel

# 3. Deploy backend to Railway
# Go to railway.app, connect GitHub, deploy each service

# 4. Update frontend env variables in Vercel dashboard
# Point to Railway backend URLs

# Total time: ~15 minutes
# Cost: $0 (free tiers)
```

Would you like me to help with any specific deployment option?
