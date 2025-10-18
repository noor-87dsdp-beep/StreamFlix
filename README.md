# StreamFlix - Premium Video Streaming Platform

A modern, feature-rich video streaming application built with React 18, Vite, and Tailwind CSS.

## 🎨 Features

### UI/UX
- ✨ Premium glassmorphism design
- 🌈 Stunning color scheme (Purple, Blue, Pink, Cyan)
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🎬 Professional video player with streaming
- 🔍 Real-time search functionality
- ⭐ Watchlist & favorites system
- 📺 Category-based browsing
- 🎭 Dynamic category carousel
- 💾 Watch history tracking

### Technical Features
- React 18 with Vite for blazing-fast development
- Tailwind CSS for modern styling
- React Router v6 for navigation
- Axios for API calls
- React Context API for state management
- Lucide React for beautiful icons
- Custom hooks for reusable logic
- LocalStorage for data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd StreamFlix
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
StreamFlix/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── VideoCard.jsx
│   │   ├── CategoryCarousel.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── NavigationBar.jsx
│   │   ├── SidebarMenu.jsx
│   │   ├── VideoGrid.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Toast.jsx
│   │   └── Modal.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── VideoPlayerPage.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Watchlist.jsx
│   │   └── Profile.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useApi.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── services/            # API service layer
│   │   ├── api.js
│   │   ├── videoService.js
│   │   └── categoryService.js
│   ├── context/             # React Context providers
│   │   ├── AppContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/               # Utility functions
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── .gitignore              
├── package.json
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md
```

## 🔌 API Integration

The application integrates with the following API endpoints:

- **Get All Categories**: `GET /api/v1/categories/get-all-category`
- **Get Videos by Category**: `GET /api/v1/videos/get-video/category-paginated/:categoryNo?page=1&limit=30`

Base URL: `https://video-stream-app-7n3q.onrender.com/api/v1`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Color Palette

- **Primary Purple**: `#8B5CF6`
- **Primary Blue**: `#3B82F6`
- **Primary Pink**: `#EC4899`
- **Primary Cyan**: `#06B6D4`
- **Dark Background**: `#0F172A`
- **Dark Card**: `#1E293B`
- **Dark Hover**: `#334155`

## 🌟 Key Components

### VideoPlayer
Professional video player with:
- Play/Pause controls
- Volume control
- Seek bar
- Fullscreen mode
- Time display

### CategoryCarousel
Horizontal scrolling carousel for categories with smooth animations.

### VideoGrid
Responsive grid layout for displaying videos with loading states.

### Toast Notifications
Beautiful toast notifications for user feedback.

## 📱 Responsive Design

- Mobile: Optimized for screens < 640px
- Tablet: Optimized for screens 640px - 1024px
- Desktop: Optimized for screens > 1024px

## 🔒 Data Persistence

User data is stored locally using localStorage:
- Watchlist
- Watch history
- Favorites
- Theme preference

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to Netlify

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

StreamFlix Development Team

---

Made with ❤️ using React, Vite, and Tailwind CSS
