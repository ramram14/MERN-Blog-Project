import express from 'express';
import { checkBlogSlugIsValid, createBlog, deleteBlog, getAllBlogs, getBlogBySlug, getBlogsByAuthor, getBlogsByCategory, updateBlogData } from '../controllers/blogControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload, { handleMulterError } from '../middleware/multerMiddleware.js';
import { validateData } from '../middleware/validationMiddleware.js';
import { createBlogSchema, updateBlogDataSchema } from '../lib/validators.js';


const router = express.Router();

// Post a blog
router.post('/',
  authMiddleware,
  upload.single('image'),
  handleMulterError,
  validateData(createBlogSchema),
  createBlog
)

// Get all blogs
router.get('/', getAllBlogs);

// Get blogs by category
router.get('/category', getBlogsByCategory)

// Get blogs by author
router.get('/author',
  authMiddleware,
  getBlogsByAuthor
)
// Get blog by slug
router.get('/:slug', getBlogBySlug);

// Update blog data
router.patch('/:slug',
  checkBlogSlugIsValid,
  authMiddleware,
  upload.single('image'),
  handleMulterError,
  validateData(updateBlogDataSchema),
  updateBlogData
);


// Delete blog
router.delete('/:slug',
  authMiddleware,
  deleteBlog
)

export default router;