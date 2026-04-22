import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/Auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/Auth/register', userData);
    return response.data;
  },

  me: async () => {
    const response = await api.get('/api/Auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/Auth/logout');
    return response.data;
  },
};

export default authService;
