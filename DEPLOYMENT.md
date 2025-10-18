# 🚀 StreamFlix Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 16+ and npm

### Installation & Running

```bash
# 1. Clone the repository
git clone <repository-url>
cd StreamFlix

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

The application will open at `http://localhost:3000`

## 📦 Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 🌐 Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_BASE_URL`
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## 🔷 Deploy to Netlify

### Option 1: Drag & Drop

```bash
# Build the project
npm run build

# Drag the 'dist' folder to Netlify
```

Go to [Netlify Drop](https://app.netlify.com/drop) and drag your `dist/` folder.

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Continuous Deployment

1. Push code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Add `VITE_API_BASE_URL`
6. Click "Deploy site"

## 📱 Deploy to Other Platforms

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.js to set base path
export default defineConfig({
  base: '/StreamFlix/',
  // ... rest of config
})

# Deploy
npm run deploy
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Configure:
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deployment: Optional

# Build and deploy
npm run build
firebase deploy
```

### AWS S3 + CloudFront

```bash
# Build the project
npm run build

# Upload to S3 bucket (configured for static website hosting)
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache (if using)
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔧 Environment Variables

Create a `.env` file (or configure in your hosting platform):

```env
VITE_API_BASE_URL=https://video-stream-app-7n3q.onrender.com/api/v1
```

**Important**: 
- Variables must start with `VITE_` to be accessible in the app
- Never commit `.env` to version control
- Set environment variables in your hosting platform's dashboard

## 🔒 Security Best Practices

1. **Environment Variables**: Store sensitive data in environment variables
2. **HTTPS**: Always use HTTPS in production (handled by most platforms)
3. **API Keys**: Never expose API keys in client-side code
4. **Content Security Policy**: Configure CSP headers in your hosting platform

## 📊 Performance Optimization

The build is already optimized, but you can further improve:

1. **Enable CDN**: Most hosting platforms provide this automatically
2. **Compression**: Enable Gzip/Brotli compression
3. **Caching**: Configure proper cache headers
4. **Image Optimization**: Use optimized images and lazy loading

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh (SPA routing issue)

For platforms that don't support SPA routing out of the box, create a redirect rule:

**Netlify**: Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- For production, set variables in hosting platform dashboard

## 📈 Monitoring & Analytics

Consider adding:
- **Google Analytics**: For user tracking
- **Sentry**: For error monitoring
- **LogRocket**: For session replay

## 🎉 Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify API integration
- [ ] Check responsive design on multiple devices
- [ ] Test video playback
- [ ] Verify all features (watchlist, favorites, search)
- [ ] Check console for errors
- [ ] Test performance with Lighthouse
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Configure analytics (optional)

## 📞 Support

For issues or questions:
- Check the README.md for documentation
- Review IMPLEMENTATION.md for technical details
- Open an issue on GitHub

---

**Need help?** The application is production-ready and tested. Follow this guide for a smooth deployment! 🚀
