import express from 'express';
import { uploadReceipt, getPendingPurchases, updatePurchaseStatus } from '../controllers/purchaseController';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/upload-receipt', upload.single('receipt'), uploadReceipt);
router.get('/admin/all', getPendingPurchases);
router.patch('/admin/:id/status', updatePurchaseStatus);

export default router;
