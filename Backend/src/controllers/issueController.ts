import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, month, year } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const pdfUrl = files['pdf'] ? files['pdf'][0].path : '';
    const imageUrl = files['image'] ? files['image'][0].path : '';

    if (!pdfUrl || !imageUrl) {
      res.status(400).json({ error: 'PDF and Image are required' });
      return;
    }

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        month,
        year,
        pdfUrl,
        imageUrl,
      },
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create issue' });
  }
};

export const getAllIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

export const getRecentIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const issues = await prisma.issue.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent issues' });
  }
};
