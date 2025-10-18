import { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import { getVideosByCategory } from '../services/videoService';
import CategoryCarousel from '../components/CategoryCarousel';
import VideoGrid from '../components/VideoGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { showToast } = useApp();
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch videos when active category changes
  useEffect(() => {
    if (activeCategory) {
      fetchVideos(activeCategory.categoryNo, 1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      
      if (response.success && response.data) {
        setCategories(response.data);
        // Load videos from first category by default
        if (response.data.length > 0) {
          setActiveCategory(response.data[0]);
        }
      }
    } catch (err) {
      setError('Failed to load categories');
      showToast('Failed to load categories', 'error');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (categoryNo, pageNum = 1, reset = false) => {
    try {
      setVideosLoading(true);
      const response = await getVideosByCategory(categoryNo, pageNum, 30);
      
      if (response.success && response.videos) {
        if (reset) {
          setVideos(response.videos);
        } else {
          setVideos(prev => [...prev, ...response.videos]);
        }
        
        // Use pagination metadata from API response
        setHasMore(response.pagination?.hasNextPage || false);
        setPage(pageNum);
      }
    } catch (err) {
      setError('Failed to load videos');
      showToast('Failed to load videos', 'error');
      console.error('Error fetching videos:', err);
    } finally {
      setVideosLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMore = () => {
    if (activeCategory && !videosLoading && hasMore) {
      fetchVideos(activeCategory.categoryNo, page + 1, false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <div className="flex gap-3 overflow-x-auto">
              <LoadingSkeleton type="category" count={5} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <LoadingSkeleton type="video" count={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-purple via-primary-pink to-primary-cyan bg-clip-text text-transparent">
            Welcome to StreamFlix
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and watch premium videos from various categories
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryCarousel
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        )}

        {/* Videos Grid */}
        <div className="mb-8">
          {activeCategory && (
            <h2 className="text-2xl font-bold text-white mb-6">
              {activeCategory.categoryName} Videos
            </h2>
          )}
          
          <VideoGrid videos={videos} loading={videosLoading && videos.length === 0} error={error} />

          {/* Load More Button */}
          {hasMore && videos.length > 0 && !videosLoading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-gradient-to-r from-primary-purple to-primary-pink rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Load More
              </button>
            </div>
          )}

          {videosLoading && videos.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
