import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies[process.env.USER_TOKEN_NAME];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please sign in first'
      });
    };
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      res.clearCookie(process.env.USER_TOKEN_NAME);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid token'
      })
    }

    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      res.clearCookie(process.env.USER_TOKEN_NAME);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - User not found'
      })
    }

    // For each route that needs token protection, we always send new user data to that route and save it to req for easy access
    req.userData = user;
    next();
  } catch (error) {
    console.log('Error in authMiddleware middleware', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default authMiddleware;