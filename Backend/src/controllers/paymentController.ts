import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../config/prisma';

// Helper to generate PayHere MD5 hash
const generateHash = (merchantId: string, orderId: string, amount: number, currency: string, merchantSecret: string) => {
  const amountFormatted = amount.toLocaleString('en-us', { minimumFractionDigits: 2 }).split(',').join('');
  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const mainString = merchantId + orderId + amountFormatted + currency + secretHash;
  return crypto.createHash('md5').update(mainString).digest('hex').toUpperCase();
};

export const generatePaymentParams = async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId);
  const issueId = parseInt(req.body.issueId);

  if (isNaN(userId) || isNaN(issueId)) {
    return res.status(400).json({ error: 'Invalid userId or issueId' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const issue = await prisma.issue.findUnique({ where: { id: issueId } });

    if (!user || !issue) {
      return res.status(404).json({ error: 'User or Issue not found' });
    }

    // Checking if already purchased
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_magazineIssueId: {
          userId,
          magazineIssueId: issueId,
        },
      },
    });

    if (existingPurchase && existingPurchase.status === 'paid') {
      return res.status(400).json({ error: 'Issue already purchased' });
    }

    // For PayHere Sandbox/Production configuration
    const merchantId = process.env.PAYHERE_MERCHANT_ID || '';
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '';
    const currency = 'LKR'; // Adjust as needed
    const amount = issue.price || 500.00; // Use issue price or fallback

    // Create a pending purchase record
    const purchase = await prisma.purchase.upsert({
      where: {
        userId_magazineIssueId: {
          userId,
          magazineIssueId: issueId,
        },
      },
      update: {
        status: 'pending',
        amount,
      },
      create: {
        userId,
        magazineIssueId: issueId,
        amount,
        status: 'pending',
      },
    });

    const orderId = String(purchase.id);
    const hash = generateHash(merchantId, orderId, amount, currency, merchantSecret);

    const paymentParams = {
      sandbox: process.env.NODE_ENV !== 'production',
      merchant_id: merchantId,
      return_url: `${process.env.FRONTEND_URL}/payment?status=success&issueId=${issueId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment?status=cancel&issueId=${issueId}`,
      notify_url: `${process.env.BACKEND_URL}/api/payments/notify`,
      order_id: orderId,
      items: `Thai Nilam Magazine - ${issue.title || (issue.month + ' ' + issue.year)}`,
      amount: amount.toFixed(2),
      currency: currency,
      first_name: user.name.split(' ')[0],
      last_name: user.name.split(' ').slice(1).join(' ') || 'User',
      email: user.email,
      phone: '0712345678', // Placeholder, ideally from user.phone
      address: 'No. 1, Main Street', // Placeholder, ideally from user.address
      city: 'Colombo',
      country: 'Sri Lanka',
      hash: hash,
    };

    return res.json(paymentParams);
  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

export const handlePaymentNotification = async (req: Request, res: Response) => {
  const {
    merchant_id,
    order_id: raw_order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const order_id = parseInt(raw_order_id);
  if (isNaN(order_id)) {
    console.error('Invalid order_id received from PayHere:', raw_order_id);
    return res.status(400).send('Invalid order_id');
  }

  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '';
  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const localMd5Sig = crypto
    .createHash('md5')
    .update(merchant_id + raw_order_id + payhere_amount + payhere_currency + status_code + secretHash)
    .digest('hex')
    .toUpperCase();

  if (localMd5Sig === md5sig && status_code === '2') {
    // Payment success
    try {
      await prisma.purchase.update({
        where: { id: order_id },
        data: {
          status: 'paid',
          paidAt: new Date(),
        },
      });
      console.log(`Payment successful for order: ${order_id}`);
    } catch (error) {
      console.error('Notification update error:', error);
      return res.status(500).send('Error updating purchase');
    }
  } else {
    console.warn(`Payment verification failed or status not success: ${status_code} for order ${order_id}`);
    if (status_code === '-2') {
      try {
        await prisma.purchase.update({
          where: { id: order_id },
          data: { status: 'failed' },
        });
      } catch (e) {}
    }
  }

  return res.status(200).send('OK');
};
