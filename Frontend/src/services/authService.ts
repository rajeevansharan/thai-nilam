import axios from 'axios';

import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/users/register', { name, email, password });
  return response.data;
};

// Add interceptor to include auth token in requests
api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('thai_nilam_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error('Failed to parse user from local storage', e);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
