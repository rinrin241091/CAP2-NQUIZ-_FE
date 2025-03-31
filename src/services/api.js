import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Log environment variables in development
if (process.env.NODE_ENV === 'development') {
  console.log('API URL:', API_URL);
  console.log('Environment:', process.env.NODE_ENV);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const login = (credentials) => api.post('/api/auth/login', credentials);
export const register = (userData) => api.post('/api/auth/register', userData);

// User services
export const getProfile = () => api.get('/api/users/profile');
export const updateProfile = (userData) => api.put('/api/users/profile', userData);
export const updatePassword = (passwordData) => api.put('/api/users/password', passwordData);

// Dashboard endpoints
export const getDashboardStats = () => api.get('/api/dashboard/stats');
export const getDashboardPerformance = () => api.get('/api/dashboard/performance');
export const getDashboardActivities = () => api.get('/api/dashboard/activities');

export default api; 