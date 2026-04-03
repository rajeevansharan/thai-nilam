import { Router } from 'express';
import { createIssue, getAllIssues, getRecentIssues, updateIssue, deleteIssue } from '../controllers/issueController';
import upload from '../middleware/upload';

const router = Router();

router.post('/', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'contentImages', maxCount: 5 }
]), createIssue);

router.put('/:id', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'contentImages', maxCount: 5 }
]), updateIssue);

router.delete('/:id', deleteIssue);

router.get('/', getAllIssues);
router.get('/recent', getRecentIssues);

export default router;
