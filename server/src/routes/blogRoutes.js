import express from 'express';
import { checkBlogSlugIsValid, createBlog, deleteBlog, getAllBlogs, getBlogBySlug, updateBlogData, updateBlogImage, updateBlogTitle } from '../controllers/blogControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload, { handleMulterError } from '../middleware/multerMiddleware.js';
import { validateData } from '../middleware/validationMiddleware.js';
import { createBlogSchema, updateBlogDataSchema, updateBlogTitleSchema } from '../lib/validators.js';
import { uploadImage } from '../middleware/cloudinaryMiddleware.js';

const router = express.Router();

// Post a blog
router.post('/',
  authMiddleware,
  upload.single('image'),
  handleMulterError,
  uploadImage,
  validateData(createBlogSchema),
  createBlog
)

// Get all blogs
router.get('/', getAllBlogs);

// Get blog by slug
router.get('/:slug', getBlogBySlug);

// Update blog data
router.patch('/:slug',
  checkBlogSlugIsValid,
  authMiddleware,
  validateData(updateBlogDataSchema),
  updateBlogData
);

// Update blog tile, we seperate it because if title change it means slug ahs need to change either
router.patch('/:slug/title',
  checkBlogSlugIsValid,
  authMiddleware,
  validateData(updateBlogTitleSchema),
  updateBlogTitle
)

// Update blog image
router.patch('/:slug/image',
  checkBlogSlugIsValid,
  authMiddleware,
  upload.single('image'),
  handleMulterError,
  uploadImage,
  updateBlogImage
)

// Delete blog
router.delete('/:slug',
  authMiddleware,
  deleteBlog
)

export default router;