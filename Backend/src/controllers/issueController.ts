import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, month, year } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const pdfUrl = files['pdf'] ? files['pdf'][0].path : '';
    const imageUrl = files['image'] ? files['image'][0].path : '';
    const contentImageFiles = files['contentImages'] || [];

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
        contentImages: {
          create: contentImageFiles.map(file => ({
            url: file.path
          }))
        }
      },
      include: {
        contentImages: true
      }
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create issue' });
  }
};

export const getAllIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const { month, year, userId: rawUserId } = req.query;
    const userId = rawUserId ? parseInt(rawUserId as string) : undefined;
    
    const filter: any = {};
    if (month && month !== 'All') {
      filter.month = month as string;
    }
    if (year && year !== 'All') {
      filter.year = year as string;
    }

    const issues = await prisma.issue.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      include: {
        contentImages: true,
        favorites: userId ? {
          where: { userId }
        } : false,
        purchases: userId ? {
          where: { userId, status: 'paid' }
        } : false
      }
    });

    const formattedIssues = issues.map(issue => {
      const { purchases, favorites, ...rest } = issue as any;
      return {
        ...rest,
        isPurchased: purchases ? purchases.length > 0 : false,        
        isFavorite: favorites ? favorites.length > 0 : false
      };
    });

    res.json(formattedIssues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

export const getRecentIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId: rawUserId } = req.query;
    const userId = rawUserId ? parseInt(rawUserId as string) : undefined;
    
    const issues = await prisma.issue.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        favorites: userId ? {
          where: { userId }
        } : false,
        purchases: userId ? {
          where: { userId, status: 'paid' }
        } : false
      }
    });
    
    const formattedIssues = issues.map(issue => {
      const { purchases, favorites, ...rest } = issue as any;
      return {
        ...rest,
        isPurchased: purchases ? purchases.length > 0 : false,        
        isFavorite: favorites ? favorites.length > 0 : false
      };
    });  res.json(formattedIssues);
    
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recent issues' });
      }
    };
