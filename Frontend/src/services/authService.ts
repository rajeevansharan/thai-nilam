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

export default api;
