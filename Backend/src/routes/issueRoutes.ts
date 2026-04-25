import { Router } from 'express';
import { createIssue, getAllIssues, getRecentIssues, updateIssue, deleteIssue } from '../controllers/issueController';
import upload from '../middleware/upload';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, requireAdmin, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'contentImages', maxCount: 5 }
]), createIssue);

router.put('/:id', authenticate, requireAdmin, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'contentImages', maxCount: 5 }
]), updateIssue);

router.delete('/:id', authenticate, requireAdmin, deleteIssue);

router.get('/', getAllIssues);
router.get('/recent', getRecentIssues);

export default router;
