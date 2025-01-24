import { updateImage } from '../lib/cloudinary.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const updateProfileData = async (req, res) => {
  try {
    const user = req.userData;
    const { fullName, username, email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id
      }, {
      fullName,
      username,
      email
    }, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.log('Error in updateProfile controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const updateProfileDataEmail = async (req, res) => {
  try {
    const user = req.userData;
    const { email, password } = req.body;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      })
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id
      }, {
      email
    }, {
      new: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: updatedUser
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully'
    })
  } catch (error) {
    console.log('Error in updateProfileEmail controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const updateProfileDataPassword = async (req, res) => {
  try {
    const user = req.userData;
    const { newPassword, oldPassword } = req.body;

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      })
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id
      }, {
      password: hashedPassword
    }, {
      new: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully'
    })
  } catch (error) {
    console.log('Error in updateProfilePassword controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const updateProfileDataImage = async (req, res) => {
  try {
    const user = req.userData;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is Required',
        errorMessage: 'Image is Reqired'
      });
    }
    const localFilePath = req.file.path;
    const imageUrl = await updateImage(localFilePath, user.profileImage);

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: 'Cannot upload image, please try again',
      })
    }
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id
      }, {
      profileImage: imageUrl
    }, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.log('Error in updateProfileDataImage controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}