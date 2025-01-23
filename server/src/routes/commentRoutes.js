import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createCommentByBlogId, deleteCommentByCommentId } from '../controllers/commentController.js';
import { validateData } from '../middleware/validationMiddleware.js';
import { createCommentSchema } from '../lib/validators.js';

const router = express.Router();

router.post('/:blogId',
  authMiddleware,
  validateData(createCommentSchema),
  createCommentByBlogId
)

router.delete('/:commentId',
  authMiddleware,
  deleteCommentByCommentId
)

export default router