import { useApp } from '../context/AppContext';
import { ListVideo, Trash2 } from 'lucide-react';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useApp();

  const handleRemove = (videoId, e) => {
    e.stopPropagation();
    removeFromWatchlist(videoId);
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-primary-purple to-primary-pink p-3 rounded-lg">
              <ListVideo className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
          </div>
          <p className="text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? 'video' : 'videos'} in your watchlist
          </p>
        </div>

        {/* Watchlist Content */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ListVideo className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-6">
              Add videos to your watchlist to watch them later
            </p>
            <a
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-purple to-primary-pink rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Browse Videos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlist.map((video) => (
              <div key={video._id} className="relative group">
                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemove(video._id, e)}
                  className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from watchlist"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
                
                {/* Video Card - using the VideoCard component would be better */}
                <a href={`/video/${video._id}`} className="block">
                  <div className="bg-dark-card rounded-lg overflow-hidden border border-gray-800 hover:border-primary-purple transition-all">
                    <div className="relative aspect-video bg-gray-800">
                      <img
                        src={video.thumbnail || '/placeholder.jpg'}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-1 line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
