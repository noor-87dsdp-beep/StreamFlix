import { get } from './api';
import { API_ENDPOINTS, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../utils/constants';

/**
 * Get videos by category with pagination
 */
export const getVideosByCategory = async (categoryNo, page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE) => {
  try {
    const response = await get(
      `${API_ENDPOINTS.GET_VIDEOS_BY_CATEGORY}/${categoryNo}`,
      {
        params: { page, limit }
      }
    );
    
    // The API returns paginated data with structure: { data: { docs: [...], totalDocs, page, ... } }
    // We need to extract the videos from response.data.docs and preserve pagination info
    if (response.success && response.data) {
      return {
        ...response,
        videos: response.data.docs || [],
        pagination: {
          totalDocs: response.data.totalDocs,
          limit: response.data.limit,
          page: response.data.page,
          totalPages: response.data.totalPages,
          hasNextPage: response.data.hasNextPage,
          hasPrevPage: response.data.hasPrevPage,
        }
      };
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    throw error;
  }
};

/**
 * Get video by ID
 */
export const getVideoById = async (videoId) => {
  try {
    const response = await get(`${API_ENDPOINTS.GET_VIDEO_BY_ID}/${videoId}`);
    return response;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

/**
 * Search videos (if API supports it)
 */
export const searchVideos = async (query, page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE) => {
  try {
    // Assuming there's a search endpoint
    const response = await get('/videos/search', {
      params: { q: query, page, limit }
    });
    return response;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

/**
 * Get all videos (if needed)
 */
export const getAllVideos = async (page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE) => {
  try {
    const response = await get('/videos/get-all-videos', {
      params: { page, limit }
    });
    
    // Handle paginated response structure if present
    if (response.success && response.data && response.data.docs) {
      return {
        ...response,
        videos: response.data.docs || [],
        pagination: {
          totalDocs: response.data.totalDocs,
          limit: response.data.limit,
          page: response.data.page,
          totalPages: response.data.totalPages,
          hasNextPage: response.data.hasNextPage,
          hasPrevPage: response.data.hasPrevPage,
        }
      };
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching all videos:', error);
    throw error;
  }
};
