import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const fetchTasks = (search = '', status = 'all', startDate = '', endDate = '') =>
  apiClient.get(`/tasks`, { params: { search, status, startDate, endDate } });

export const createTask = (data) => apiClient.post(`/tasks`, data);
export const updateTask = (id, data) => apiClient.put(`/tasks/${id}`, data);
export const toggleTask = (id, completed) =>
  apiClient.patch(`/tasks/${id}`, { completed });
export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);
