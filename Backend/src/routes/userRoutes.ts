import { Router } from 'express';
import { login, getAllUsers, toggleFavorite, getFavorites } from '../controllers/userController';

const router = Router();

router.post('/login', login);
router.get('/users', getAllUsers);
router.post('/favorites/toggle', toggleFavorite);
router.get('/favorites/:userId', getFavorites);

export default router;
