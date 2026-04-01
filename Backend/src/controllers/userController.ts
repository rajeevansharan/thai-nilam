import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // As per user's request, no JWT or Bcrypt yet. Plain text check.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isPremium: user.isPremium,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isPremium: true,
          createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, magazineIssueId } = req.body;
    
    if (!userId || !magazineIssueId) {
      res.status(400).json({ error: 'Missing userId or magazineIssueId' });
      return;
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_magazineIssueId: {
          userId: Number(userId),
          magazineIssueId: Number(magazineIssueId),
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      res.json({ message: 'Removed from favorites' });
    } else {
      await prisma.favorite.create({
        data: {
          userId: Number(userId),
          magazineIssueId: Number(magazineIssueId),
        },
      });
      res.json({ message: 'Added to favorites' });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      res.status(400).json({ error: 'Missing userId' });
      return;
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(userId) },
      include: {
        issue: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites.map(f => f.issue));
  } catch (error) {
    console.error('Fetch favorites error:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};
