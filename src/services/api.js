import axios from 'axios';

// ─── Base URL ──────────────────────────────────────────────────────────────────
export const BASE_URL = ''; // Proxied via Vite

// ─── Axios Instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(err);
  }
);

export default api;

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const authService = {
  login: (data) => api.post('/api/Auth/login', data),
  logout: () => api.post('/api/Auth/logout'),
  me: () => api.get('/api/Auth/me'),
};

// ─── Projects ──────────────────────────────────────────────────────────────────
export const projectsService = {
  getAll: (pageNumber = 1, pageSize = 10) =>
    api.get('/api/Projects', { params: { pageNumber, pageSize } }),

  create: (formData) =>
    api.post('/api/Projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id, data) => api.put(`/api/Projects/${id}`, data),

  delete: (id) => api.delete(`/api/Projects/${id}`),
};

// ─── News ──────────────────────────────────────────────────────────────────────
export const newsService = {
  getAll: (pageNumber = 1, pageSize = 10) =>
    api.get('/api/News', { params: { pageNumber, pageSize } }),

  create: (data) => api.post('/api/News', data),

  update: (id, data) => api.put(`/api/News/${id}`, data),

  delete: (id) => api.delete(`/api/News/${id}`),
};
