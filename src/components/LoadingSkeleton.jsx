const LoadingSkeleton = ({ type = 'video', count = 1 }) => {
  const VideoSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-lg aspect-video mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="animate-pulse flex items-center gap-3 px-6 py-3 rounded-full bg-gray-700 min-w-[120px]">
      <div className="h-4 bg-gray-600 rounded w-20"></div>
    </div>
  );

  const PlayerSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-lg aspect-video mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-20 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'category':
        return <CategorySkeleton />;
      case 'player':
        return <PlayerSkeleton />;
      case 'video':
      default:
        return <VideoSkeleton />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
