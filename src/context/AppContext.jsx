import { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS, TOAST_TYPES } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useLocalStorage(STORAGE_KEYS.WATCHLIST, []);
  const [watchHistory, setWatchHistory] = useLocalStorage(STORAGE_KEYS.WATCH_HISTORY, []);
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
  const [toasts, setToasts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add video to watchlist
  const addToWatchlist = (video) => {
    if (!watchlist.find(v => v._id === video._id)) {
      setWatchlist([...watchlist, video]);
      showToast('Added to watchlist', TOAST_TYPES.SUCCESS);
    }
  };

  // Remove video from watchlist
  const removeFromWatchlist = (videoId) => {
    setWatchlist(watchlist.filter(v => v._id !== videoId));
    showToast('Removed from watchlist', TOAST_TYPES.INFO);
  };

  // Check if video is in watchlist
  const isInWatchlist = (videoId) => {
    return watchlist.some(v => v._id === videoId);
  };

  // Add video to watch history
  const addToWatchHistory = (video) => {
    const existingIndex = watchHistory.findIndex(v => v._id === video._id);
    let newHistory;
    
    if (existingIndex !== -1) {
      // Move to top if already exists
      newHistory = [
        video,
        ...watchHistory.filter(v => v._id !== video._id)
      ];
    } else {
      // Add to top
      newHistory = [video, ...watchHistory];
    }
    
    // Keep only last 50 items
    setWatchHistory(newHistory.slice(0, 50));
  };

  // Clear watch history
  const clearWatchHistory = () => {
    setWatchHistory([]);
    showToast('Watch history cleared', TOAST_TYPES.INFO);
  };

  // Add video to favorites
  const addToFavorites = (video) => {
    if (!favorites.find(v => v._id === video._id)) {
      setFavorites([...favorites, video]);
      showToast('Added to favorites', TOAST_TYPES.SUCCESS);
    }
  };

  // Remove video from favorites
  const removeFromFavorites = (videoId) => {
    setFavorites(favorites.filter(v => v._id !== videoId));
    showToast('Removed from favorites', TOAST_TYPES.INFO);
  };

  // Check if video is in favorites
  const isInFavorites = (videoId) => {
    return favorites.some(v => v._id === videoId);
  };

  // Show toast notification
  const showToast = (message, type = TOAST_TYPES.INFO, duration = 3000) => {
    const id = generateId();
    const toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  // Remove toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle sidebar menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AppContext.Provider
      value={{
        watchlist,
        watchHistory,
        favorites,
        toasts,
        isMenuOpen,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        addToWatchHistory,
        clearWatchHistory,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        showToast,
        removeToast,
        toggleMenu,
        setIsMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
