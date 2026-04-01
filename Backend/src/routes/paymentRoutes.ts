import { Router } from 'express';
import { generatePaymentParams, handlePaymentNotification } from '../controllers/paymentController';

const router = Router();

// Endpoint for the frontend to get PayHere parameters and the secure hash
router.post('/initiate', generatePaymentParams);

// Webhook endpoint for PayHere to notify backend of payment status
router.post('/notify', handlePaymentNotification);

export default router;
