import { makeJWTToken } from '../lib/utils.js';
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'user email already exists'
      });
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword
    })
    makeJWTToken({ id: newUser._id }, res);
    return res.status(201).json({
      success: true,
      message: 'User sign up successfully',
      data: newUser
    })
  } catch (error) {
    console.log('Error in signUp controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    makeJWTToken({ id: existingUser._id }, res);
    return res.status(200).json({
      success: true,
      message: 'User sign in successfully',
      data: existingUser
    })
  } catch (error) {
    console.log('Error in signIn controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const signOut = async (req, res) => {
  try {
    res.clearCookie(process.env.USER_TOKEN_NAME);
    res.status(200).json({
      success: true,
      message: 'User signed out successfully'
    });
  } catch (error) {
    console.log('Error in signOut controller', error.message)
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}