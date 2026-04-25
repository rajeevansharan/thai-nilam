import express from 'express';
import { uploadReceipt, getPendingPurchases, updatePurchaseStatus } from '../controllers/purchaseController';
import upload from '../middleware/upload';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/upload-receipt', authenticate, upload.single('receipt'), uploadReceipt);
router.get('/admin/all', authenticate, requireAdmin, getPendingPurchases);
router.patch('/admin/:id/status', authenticate, requireAdmin, updatePurchaseStatus);

export default router;
