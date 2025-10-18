import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideosByCategory } from '../services/videoService';
import VideoPlayer from '../components/VideoPlayer';
import VideoGrid from '../components/VideoGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ArrowLeft, Clock, Eye, Calendar, Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { formatDuration, formatViews, formatDate } from '../utils/formatters';
import { useApp } from '../context/AppContext';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    addToWatchHistory,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  } = useApp();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      setError(null);

      // In a real app, we'd fetch the specific video by ID
      // For now, we'll fetch videos from a category and find the matching one
      // This is a workaround since we don't have a direct endpoint for single video
      const response = await getVideosByCategory(2, 1, 100); // Fetch from a category
      
      if (response.success && response.data) {
        // Find the video with matching ID (in real app, use getVideoById)
        const foundVideo = response.data.find(v => v._id === videoId);
        
        if (foundVideo) {
          setVideo(foundVideo);
          addToWatchHistory(foundVideo);
          
          // Get related videos (other videos from same category)
          const related = response.data.filter(v => v._id !== videoId).slice(0, 8);
          setRelatedVideos(related);
        } else {
          setError('Video not found');
        }
      }
    } catch (err) {
      setError('Failed to load video');
      console.error('Error fetching video:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist(video._id)) {
      removeFromWatchlist(video._id);
    } else {
      addToWatchlist(video);
    }
  };

  const handleFavoriteToggle = () => {
    if (isInFavorites(video._id)) {
      removeFromFavorites(video._id);
    } else {
      addToFavorites(video);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 px-4">
        <div className="container mx-auto py-8 max-w-6xl">
          <LoadingSkeleton type="player" count={1} />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">{error || 'Video not found'}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary-purple rounded-full text-white hover:bg-primary-pink transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer
            video={video}
            onEnded={() => console.log('Video ended')}
          />
        </div>

        {/* Video Info */}
        <div className="bg-dark-card rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-3">{video.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(video.views || 0)} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(video.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(video.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  isInWatchlist(video._id)
                    ? 'bg-primary-purple text-white'
                    : 'bg-dark-hover text-gray-300 hover:bg-dark-card'
                }`}
              >
                {isInWatchlist(video._id) ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
                <span>{isInWatchlist(video._id) ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <button
                onClick={handleFavoriteToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  isInFavorites(video._id)
                    ? 'bg-primary-pink text-white'
                    : 'bg-dark-hover text-gray-300 hover:bg-dark-card'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isInFavorites(video._id) ? 'currentColor' : 'none'}
                />
                <span>{isInFavorites(video._id) ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-400 leading-relaxed">{video.description}</p>
            </div>
          )}
        </div>

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Related Videos</h2>
            <VideoGrid videos={relatedVideos} loading={false} error={null} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
