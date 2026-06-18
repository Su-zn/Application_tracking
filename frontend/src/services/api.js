import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export const createApplication = (data) =>
  api.post('/api/v1/application/createApplication', data);

export const getApplications = () =>
  api.get('/api/v1/application/getApplications');

export const getApplicationById = (id) =>
  api.get(`/api/v1/application/getApplicationById/${id}`);

export const updateApplication = (id, data) =>
  api.put(`/api/v1/application/updateApplication/${id}`, data);

export const deleteApplication = (id) =>
  api.delete(`/api/v1/application/deleteApplication/${id}`);

export const searchApplications = (query) =>
  api.get(`/api/v1/application/searchApplications?q=${encodeURIComponent(query)}`);

export const filterApplicationsByStatus = (status) =>
  api.get(`/api/v1/application/filterApplicationsByStatus?status=${encodeURIComponent(status)}`);
