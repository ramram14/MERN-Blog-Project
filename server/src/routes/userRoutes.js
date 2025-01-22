import express from 'express';
import { updateProfileDataEmailSchema, updateProfileDataPasswordSchema, updateProfileDataSchema } from '../lib/validators.js';
import { updateProfileData, updateProfileDataEmail, updateProfileDataImage, updateProfileDataPassword } from '../controllers/userControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateData } from '../middleware/validationMiddleware.js';
import upload, { handleMulterError } from '../middleware/multerMiddleware.js';
import { uploadImage } from '../middleware/cloudinaryMiddleware.js';

const router = express.Router();

// Route to change profile data basic like fullName and username, doesn'n need password to confirm
router.patch('/profile-data',
  authMiddleware,
  validateData(updateProfileDataSchema),
  updateProfileData)

// Route to chang email, need password to confirm change
router.patch('/profile-data-email',
  authMiddleware,
  validateData(updateProfileDataEmailSchema),
  updateProfileDataEmail)

// Route to change password, need old password to confirm change
router.patch('/profile-data-password',
  authMiddleware,
  validateData(updateProfileDataPasswordSchema),
  updateProfileDataPassword)

// Route to change profile image
router.patch('/profile-data-image',
  authMiddleware,
  upload.single('profileImage'),
  handleMulterError,
  uploadImage,
  updateProfileDataImage)


export default router;