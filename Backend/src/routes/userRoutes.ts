import { Router } from 'express';
import { login, getAllUsers } from '../controllers/userController';

const router = Router();

router.post('/login', login);
router.get('/users', getAllUsers);

export default router;
