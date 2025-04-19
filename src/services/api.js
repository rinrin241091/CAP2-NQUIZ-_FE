// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
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

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (credentials) => api.post('/user/login', credentials);
export const register = (userData) => api.post('/user/register', userData);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => api.post('/auth/reset-password', { token, password });

// User endpoints
export const getUsers = (params) => api.get('/users', { params });
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateProfile = (userData) => api.put('/users/profile', userData);
export const changePassword = (passwords) => api.post('/users/change-password', passwords);
export const uploadAvatar = (formData) => api.post('/users/avatar', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Dashboard endpoints
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getDashboardPerformance = () => api.get('/dashboard/performance');
export const getDashboardActivities = () => api.get('/dashboard/activities');

// Quiz endpoints
export const getQuizzes = (params) => api.get('/quizzes', { params });
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const createQuiz = (quizData) => api.post('/quizzes', quizData);
export const updateQuiz = (id, quizData) => api.put(`/quizzes/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);

// Question endpoints
export const createQuestion = (questionData) => api.post('/question', questionData);
export const getQuizQuestions = (quizId) => api.get(`/question/quiz/${quizId}`);

export default api;