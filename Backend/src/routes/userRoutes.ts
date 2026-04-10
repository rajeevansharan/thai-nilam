import { Router } from 'express';
import { login, register, getAllUsers, toggleFavorite, getFavorites, deleteUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/favorites/toggle', toggleFavorite);
router.get('/favorites/:userId', getFavorites);

export default router;
