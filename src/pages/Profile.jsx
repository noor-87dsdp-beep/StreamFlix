import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { User, Heart, Clock, Moon, Sun, Trash2 } from 'lucide-react';

const Profile = () => {
  const { watchlist, watchHistory, favorites, clearWatchHistory } = useApp();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-primary-purple to-primary-pink p-4 rounded-full">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Profile</h1>
              <p className="text-gray-400">Manage your preferences and activity</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary-purple/20 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-primary-purple" />
              </div>
              <h3 className="text-gray-400 font-semibold">Favorites</h3>
            </div>
            <p className="text-3xl font-bold text-white">{favorites.length}</p>
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary-pink/20 p-2 rounded-lg">
                <User className="w-5 h-5 text-primary-pink" />
              </div>
              <h3 className="text-gray-400 font-semibold">Watchlist</h3>
            </div>
            <p className="text-3xl font-bold text-white">{watchlist.length}</p>
          </div>

          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary-cyan/20 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-primary-cyan" />
              </div>
              <h3 className="text-gray-400 font-semibold">Watch History</h3>
            </div>
            <p className="text-3xl font-bold text-white">{watchHistory.length}</p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-dark-card rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
          
          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-primary-purple" />
                ) : (
                  <Sun className="w-5 h-5 text-primary-cyan" />
                )}
                <div>
                  <h3 className="text-white font-semibold">Theme</h3>
                  <p className="text-gray-400 text-sm">
                    Current: {theme === 'dark' ? 'Dark' : 'Light'} Mode
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-primary-purple hover:bg-primary-pink rounded-lg text-white font-semibold transition-colors"
              >
                Toggle
              </button>
            </div>

            {/* Clear History */}
            <div className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-white font-semibold">Clear Watch History</h3>
                  <p className="text-gray-400 text-sm">
                    Remove all videos from your watch history
                  </p>
                </div>
              </div>
              <button
                onClick={clearWatchHistory}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-colors"
                disabled={watchHistory.length === 0}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {watchHistory.length > 0 && (
          <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {watchHistory.slice(0, 5).map((video) => (
                <a
                  key={video._id}
                  href={`/video/${video._id}`}
                  className="flex items-center gap-4 p-3 bg-dark-hover rounded-lg hover:bg-dark-card transition-colors"
                >
                  <div className="w-24 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnail || '/placeholder.jpg'}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{video.title}</h3>
                    <p className="text-gray-400 text-sm truncate">
                      {video.description || 'No description'}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
