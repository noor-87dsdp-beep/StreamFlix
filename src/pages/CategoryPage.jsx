import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideosByCategory } from '../services/videoService';
import { getAllCategories } from '../services/categoryService';
import VideoGrid from '../components/VideoGrid';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CategoryPage = () => {
  const { categoryNo } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [category, setCategory] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCategoryAndVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNo]);

  const fetchCategoryAndVideos = async () => {
    try {
      setLoading(true);
      
      // Fetch category info
      const categoriesResponse = await getAllCategories();
      if (categoriesResponse.success && categoriesResponse.data) {
        const foundCategory = categoriesResponse.data.find(
          cat => cat.categoryNo === parseInt(categoryNo)
        );
        setCategory(foundCategory);
      }

      // Fetch videos
      const videosResponse = await getVideosByCategory(categoryNo, 1, 30);
      if (videosResponse.success && videosResponse.videos) {
        setVideos(videosResponse.videos);
        // Use pagination metadata from API response
        setHasMore(videosResponse.pagination?.hasNextPage || false);
      }
    } catch (err) {
      setError('Failed to load category videos');
      showToast('Failed to load videos', 'error');
      console.error('Error fetching category videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const response = await getVideosByCategory(categoryNo, nextPage, 30);
      
      if (response.success && response.videos) {
        setVideos(prev => [...prev, ...response.videos]);
        // Use pagination metadata from API response
        setHasMore(response.pagination?.hasNextPage || false);
        setPage(nextPage);
      }
    } catch (err) {
      showToast('Failed to load more videos', 'error');
      console.error('Error loading more videos:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Category Header */}
        {category && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {category.categoryName}
            </h1>
            <p className="text-gray-400">
              Browse all videos in this category
            </p>
          </div>
        )}

        {/* Videos Grid */}
        <VideoGrid videos={videos} loading={loading} error={error} />

        {/* Load More */}
        {hasMore && videos.length > 0 && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gradient-to-r from-primary-purple to-primary-pink rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
