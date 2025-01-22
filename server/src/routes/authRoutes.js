import express from 'express';
import { signIn, signOut, signUp } from '../controllers/authControllers.js';
import { validateData } from '../middleware/validationMiddleware.js';
import { signInSchema, signUpSchema } from '../lib/validators.js';

const router = express.Router();

// Route for sign up
router.post('/signup', validateData(signUpSchema), signUp)

// Route for sign in
router.post('/signin', validateData(signInSchema), signIn)

// Route for sign out
router.post('/signout', signOut)

export default router