import api from './authService'; // Reusing the axios instance

export const getAllIssues = async (month?: string, year?: string, userId?: string) => {
  const params = new URLSearchParams();
  if (month) params.append('month', month);
  if (year) params.append('year', year);
  if (userId) params.append('userId', userId);
  
  const response = await api.get(`/issues?${params.toString()}`);
  return response.data;
};

export const createIssue = async (formData: FormData) => {
  const response = await api.post('/issues', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const initiatePayment = async (userId: string, issueId: string) => {
  const response = await api.post('/payments/initiate', { userId, issueId });
  return response.data;
};

