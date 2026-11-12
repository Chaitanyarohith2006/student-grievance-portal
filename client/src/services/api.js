import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student APIs
export const submitGrievance = (data) => api.post('/api/grievances', data);
export const trackGrievance = (trackingId) => api.get(`/api/grievances/${trackingId}`);

// Admin APIs
export const adminLogin = (credentials) => api.post('/api/admin/login', credentials);
export const getAdminGrievances = (params) => api.get('/api/admin/grievances', { params });
export const updateGrievance = (id, data) => api.patch(`/api/admin/grievances/${id}`, data);

export default api;
