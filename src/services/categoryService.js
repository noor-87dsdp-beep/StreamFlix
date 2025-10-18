import { get } from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all categories
 */
export const getAllCategories = async () => {
  try {
    const response = await get(API_ENDPOINTS.GET_ALL_CATEGORIES);
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (categoryId) => {
  try {
    // This endpoint may not exist in the API, but included for completeness
    const response = await get(`${API_ENDPOINTS.GET_ALL_CATEGORIES}/${categoryId}`);
    return response;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
