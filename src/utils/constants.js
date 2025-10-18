// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://video-stream-app-7n3q.onrender.com/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  GET_ALL_CATEGORIES: '/categories/get-all-category',
  GET_VIDEOS_BY_CATEGORY: '/videos/get-video/category-paginated',
  GET_VIDEO_BY_ID: '/videos/get-video',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 30;
export const DEFAULT_PAGE = 1;

// Local Storage Keys
export const STORAGE_KEYS = {
  WATCHLIST: 'streamflix_watchlist',
  WATCH_HISTORY: 'streamflix_watch_history',
  THEME: 'streamflix_theme',
  FAVORITES: 'streamflix_favorites',
};

// Video Player Settings
export const VIDEO_PLAYER_CONFIG = {
  controls: true,
  autoplay: false,
  preload: 'metadata',
  fluid: true,
};

// Theme
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Debounce Delay (ms)
export const DEBOUNCE_DELAY = 500;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};
