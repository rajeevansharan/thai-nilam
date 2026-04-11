import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { uploadFile } from '../services/storageService';

export const createIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, month, year, price } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const pdfUrl = files['pdf'] ? await uploadFile(files['pdf'][0], 'pdfs') : '';
    const imageUrl = files['image'] ? await uploadFile(files['image'][0], 'images') : '';
    const contentImageFiles = files['contentImages'] || [];

    if (!pdfUrl || !imageUrl) {
      res.status(400).json({ error: 'PDF and Image are required' });
      return;
    }

    const contentImageUrls = await Promise.all(
      contentImageFiles.map(file => uploadFile(file, 'images'))
    );

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        month,
        year,
        pdfUrl,
        imageUrl,
        price: price ? parseFloat(price) : undefined,
        contentImages: {
          create: contentImageUrls.map(url => ({
            url
          }))
        }
      },
      include: {
        contentImages: true
      }
    });

    res.status(201).json(issue);
  } catch (error) {
    console.error('Create issue error:', error);
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
    console.error('Fetch issues error:', error);
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
    });  res.json(formattedIssues);
    
  } catch (error) {
    console.error('Fetch recent issues error:', error);
    res.status(500).json({ error: 'Failed to fetch recent issues' });
  }
    };

export const updateIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, month, year, price } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const updateData: any = {
      title,
      description,
      month,
      year,
      price: price ? parseFloat(price) : undefined
    };

    if (files) {
      if (files['pdf']?.[0]) updateData.pdfUrl = await uploadFile(files['pdf'][0], 'pdfs');
      if (files['image']?.[0]) updateData.imageUrl = await uploadFile(files['image'][0], 'images');
      
      if (files['contentImages']) {
        const contentImageFiles = files['contentImages'];
        const contentImageUrls = await Promise.all(
          contentImageFiles.map(file => uploadFile(file, 'images'))
        );
        
        // Delete old content images first
        await prisma.contentImage.deleteMany({
          where: { issueId: parseInt(id as any) }
        });

        updateData.contentImages = {
          create: contentImageUrls.map(url => ({
            url
          }))
        };
      }
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id as any) },
      data: updateData,
      include: {
        contentImages: true
      }
    });

    res.json(updatedIssue);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update issue' });
  }
};

export const deleteIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.issue.delete({
      where: { id: parseInt(id as any) }
    });

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete issue' });
  }
};
