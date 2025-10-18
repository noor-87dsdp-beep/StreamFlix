import { Play, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDuration, formatViews, formatRelativeTime } from '../utils/formatters';
import { truncateText } from '../utils/helpers';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-dark-card border border-gray-800 hover:border-primary-purple transition-all">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-800">
          <img
            src={video.thumbnail || '/placeholder.jpg'}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-primary-purple rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>
          
          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(video.duration)}
            </div>
          )}
        </div>
        
        {/* Video Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-primary-purple transition-colors">
            {truncateText(video.title, 60)}
          </h3>
          
          {video.description && (
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {truncateText(video.description, 80)}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{formatViews(video.views || 0)} views</span>
            </div>
            <span>{formatRelativeTime(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
