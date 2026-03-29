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
