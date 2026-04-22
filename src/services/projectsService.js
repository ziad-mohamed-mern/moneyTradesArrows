import api from './api';

const projectsService = {
  getAll: (pageNumber = 1, pageSize = 10) =>
    api.get('/api/Projects', { params: { pageNumber, pageSize } }),

  create: (formData) =>
    api.post('/api/Projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id, data) => api.put(`/api/Projects/${id}`, data),

  delete: (id) => api.delete(`/api/Projects/${id}`),
};

export default projectsService;
