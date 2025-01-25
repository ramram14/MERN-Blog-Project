import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createCommentByBlogId, deleteCommentByCommentId, likeOrUnlikeComment } from '../controllers/commentController.js';
import { validateData } from '../middleware/validationMiddleware.js';
import { createCommentSchema } from '../lib/validators.js';

const router = express.Router();

// Create comment, require blog id
router.post('/:blogId',
  authMiddleware,
  validateData(createCommentSchema),
  createCommentByBlogId
)

// Like or unlike comment
router.post('/:commentId/like',
  authMiddleware,
  likeOrUnlikeComment
)

// Delete comment
router.delete('/:commentId',
  authMiddleware,
  deleteCommentByCommentId
)


export default router