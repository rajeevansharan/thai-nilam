import api from './authService';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  isPremium: boolean;
  createdAt: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users/users');
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await api.delete(`/users/users/${id}`);
  return response.data;
};

export const updateUser = async (id: number, data: { role?: string; isPremium?: boolean }): Promise<User> => {
  const response = await api.put(`/users/users/${id}`, data);
  return response.data;
};
