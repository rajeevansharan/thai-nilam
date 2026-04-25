import { Router } from 'express';
import { login, register, getAllUsers, toggleFavorite, getFavorites, deleteUser, updateUser } from '../controllers/userController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);

// Admin only routes
router.get('/users', authenticate, requireAdmin, getAllUsers);
router.put('/users/:id', authenticate, requireAdmin, updateUser);
router.delete('/users/:id', authenticate, requireAdmin, deleteUser);

// Authenticated user routes
router.post('/favorites/toggle', authenticate, toggleFavorite);
router.get('/favorites/:userId', authenticate, getFavorites);

export default router;
