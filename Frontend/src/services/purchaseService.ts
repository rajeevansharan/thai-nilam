import api from './authService';

export const uploadReceipt = async (userId: number, magazineIssueId: number, amount: number, receiptFile: File) => {
  const formData = new FormData();
  formData.append('userId', userId.toString());
  formData.append('magazineIssueId', magazineIssueId.toString());
  formData.append('amount', amount.toString());
  formData.append('receipt', receiptFile);

  const response = await api.post('/purchases/upload-receipt', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllPurchases = async () => {
  const response = await api.get('/purchases/admin/all');
  return response.data;
};

export const updatePurchaseStatus = async (purchaseId: number, status: 'paid' | 'failed') => {
  const response = await api.patch(`/purchases/admin/${purchaseId}/status`, { status });
  return response.data;
};
