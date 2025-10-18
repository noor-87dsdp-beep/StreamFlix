# 🚀 Quick Start Guide

Get StreamFlix up and running in under 5 minutes!

## Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)
- A modern web browser

## Installation

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd StreamFlix

# Install dependencies (takes ~30 seconds)
npm install
```

### 2. Configure Environment

```bash
# Create environment file
cp .env.example .env
```

The `.env` file is already configured with the API endpoint. No changes needed!

### 3. Start Development Server

```bash
npm run dev
```

🎉 That's it! The app will automatically open at **http://localhost:3000**

## What You'll See

When you open the app, you'll see:

1. **Navigation Bar** at the top with search functionality
2. **Category Carousel** showing different video categories (English, Russian, Desi, etc.)
3. **Video Grid** displaying videos from the selected category
4. **Sidebar Menu** (toggle with hamburger icon on mobile)

## Try These Features

### Browse Videos
- Click on different categories in the carousel
- Scroll down and click "Load More" for more videos

### Watch a Video
- Click on any video card
- Watch the video with the built-in player
- Use play/pause, volume, seek, and fullscreen controls

### Add to Watchlist
- Open a video
- Click the "Add to Watchlist" button
- Access your watchlist from the sidebar menu

### Search Videos
- Type in the search bar at the top
- Press Enter to search (search UI is ready, full implementation pending)

### Profile & Settings
- Click "Profile" in the sidebar
- View your stats (favorites, watchlist, watch history)
- Toggle theme (dark/light mode)
- Clear watch history

## Available Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
StreamFlix/
├── src/
│   ├── components/      # UI components (VideoCard, VideoPlayer, etc.)
│   ├── pages/          # Page components (Home, VideoPlayerPage, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── context/        # React Context providers
│   ├── utils/          # Utility functions
│   └── App.jsx         # Main app component
├── public/             # Static assets
└── README.md          # Full documentation
```

## Common Issues

### Port Already in Use
If port 3000 is busy:
```bash
# The app will automatically try port 3001, 3002, etc.
# Or specify a different port:
npm run dev -- --port 3001
```

### Module Not Found
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Make sure you're using Node.js 16 or higher:
```bash
node --version
```

## API Information

The app connects to:
- **Base URL**: `https://video-stream-app-7n3q.onrender.com/api/v1`
- **Categories**: Automatically loaded on start
- **Videos**: Loaded per category with pagination

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features at a Glance

✅ **Implemented**
- Video browsing by category
- Professional video player
- Watchlist management
- Favorites system
- Watch history
- Responsive design
- Theme switching
- Toast notifications

## Need Help?

- Check [README.md](./README.md) for detailed documentation
- Check [IMPLEMENTATION.md](./IMPLEMENTATION.md) for technical details
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## What's Next?

Ready to deploy? Check out our [Deployment Guide](./DEPLOYMENT.md) for instructions on:
- Deploying to Vercel (easiest)
- Deploying to Netlify
- Deploying to other platforms

---

**Enjoy building with StreamFlix!** 🎬✨
