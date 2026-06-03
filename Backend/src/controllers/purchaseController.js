const prisma = require("../config/prisma").default;
const { uploadFile } = require("../services/storageService");

const uploadReceipt = async (req, res) => {
  try {
    const { userId, magazineIssueId, amount } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Receipt file is required' });
    }

    const receiptUrl = await uploadFile(file, 'receipts');

    const purchase = await prisma.purchase.upsert({
      where: {
        userId_magazineIssueId: {
          userId: parseInt(userId),
          magazineIssueId: parseInt(magazineIssueId),
        },
      },
      update: {
        receiptUrl,
        status: 'pending',
        amount: parseFloat(amount),
      },
      create: {
        userId: parseInt(userId),
        magazineIssueId: parseInt(magazineIssueId),
        receiptUrl,
        status: 'pending',
        amount: parseFloat(amount),
      },
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error('Upload receipt error:', error);
    if (error && error.code === 'P2003') {
      res.status(401).json({
        error: 'Session invalid or expired. Please log out and log in again.'
      });
    } else {
      res.status(500).json({
        error: 'Failed to upload receipt'
      });
    }
  }
};

const getPendingPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: true,
        issue: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

const updatePurchaseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'paid' or 'failed' (failed = rejected)

    const purchase = await prisma.purchase.update({
      where: { id: parseInt(id) },
      data: {
        status,
        paidAt: status === 'paid' ? new Date() : null,
      },
    });

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update purchase status' });
  }
};

module.exports = {
  uploadReceipt,
  getPendingPurchases,
  updatePurchaseStatus,
};