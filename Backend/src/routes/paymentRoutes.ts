import { Router } from 'express';
import { generatePaymentParams, handlePaymentNotification } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Endpoint for the frontend to get PayHere parameters and the secure hash
router.post('/initiate', authenticate, generatePaymentParams);

// Webhook endpoint for PayHere to notify backend of payment status
router.post('/notify', handlePaymentNotification);

export default router;
