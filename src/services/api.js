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

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add request/response logging in development
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
  });

  api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  }, error => {
    console.log('Response Error:', error);
    return Promise.reject(error);
  });
}

// Auth services
export const login = (credentials) => api.post('/api/auth/login', credentials);
export const register = (userData) => api.post('/api/auth/register', userData);

// User services
export const getProfile = () => api.get('/api/users/profile');
export const updateProfile = (userData) => api.put('/api/users/profile', userData);
export const updatePassword = (passwordData) => api.put('/api/users/password', passwordData);

export default api; 