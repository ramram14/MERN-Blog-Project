import express from 'express';
import { updateProfileDataSchema } from '../lib/validators.js';
import { updateProfileData, updateProfileDataImage, } from '../controllers/userControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateData } from '../middleware/validationMiddleware.js';
import upload, { handleMulterError } from '../middleware/multerMiddleware.js';

const router = express.Router();

// Route to change profile data basic like fullName and username, doesn'n need password to confirm
router.patch('/profile-data',
  authMiddleware,
  validateData(updateProfileDataSchema),
  updateProfileData)

// Route to change profile image
router.patch('/profile-data-image',
  authMiddleware,
  upload.single('profileImage'),
  handleMulterError,
  updateProfileDataImage)


export default router;