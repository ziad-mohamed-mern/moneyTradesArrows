import api from './api';

const newsService = {
  getAll: (pageNumber = 1, pageSize = 10) =>
    api.get('/api/News', { params: { pageNumber, pageSize } }),

  create: (data) => api.post('/api/News', data),

  update: (id, data) => api.put(`/api/News/${id}`, data),

  delete: (id) => api.delete(`/api/News/${id}`),
};

export default newsService;
