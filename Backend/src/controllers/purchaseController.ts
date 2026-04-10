import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { uploadFile } from '../services/storageService';

export const uploadReceipt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, magazineIssueId, amount } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'Receipt file is required' });
      return;
    }

    const receiptUrl = await uploadFile(file, 'receipts');

    const purchase = await prisma.purchase.upsert({
      where: {
        userId_magazineIssueId: {
          userId: parseInt(userId),
          magazineIssueId: parseInt(magazineIssueId)
        }
      },
      update: {
        receiptUrl,
        status: 'pending',
        amount: parseFloat(amount)
      },
      create: {
        userId: parseInt(userId),
        magazineIssueId: parseInt(magazineIssueId),
        receiptUrl,
        status: 'pending',
        amount: parseFloat(amount)
      }
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error('Upload receipt error:', error);
    res.status(500).json({ error: 'Failed to upload receipt' });
  }
};

export const getPendingPurchases = async (_req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: true,
        issue: true
      },
      orderBy: { id: 'desc' }
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'paid' or 'failed' (failed = rejected)

    const purchase = await prisma.purchase.update({
      where: { id: parseInt(id as string) },
      data: { 
        status: status as any,
        paidAt: status === 'paid' ? new Date() : null
      }
    });

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update purchase status' });
  }
};
