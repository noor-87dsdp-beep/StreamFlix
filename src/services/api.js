import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getErrorMessage } from '../utils/helpers';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Transform response if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    const errorMessage = getErrorMessage(error);
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

/**
 * Make a GET request
 */
export const get = async (url, config = {}) => {
  const response = await apiClient.get(url, config);
  return response.data;
};

/**
 * Make a POST request
 */
export const post = async (url, data = {}, config = {}) => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

/**
 * Make a PUT request
 */
export const put = async (url, data = {}, config = {}) => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

/**
 * Make a DELETE request
 */
export const del = async (url, config = {}) => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;
