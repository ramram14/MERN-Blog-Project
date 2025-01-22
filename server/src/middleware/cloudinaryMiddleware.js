import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


export const uploadImage = async (req, res, next) => {
  try {
    // We setting up timeout for uploading 10 sec, if uploading take more than 10 sec, then return error
    const timeOut = (ms) => new Promise((_, reject) => (
      setTimeout(() => reject(new Error('Request Timeout')), ms)
    ))

    // if req.file is undefined means user not send the image we send status 400
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is Required',
        errorMessage: 'Image is Reqired'
      });
    }
    const uploadPromise = await cloudinary.uploader.upload(req.file.path, {
      folder: 'MERN Blog',
      resource_type: 'image'
    })

    const result = await Promise.race([uploadPromise, timeOut(10000)])

    // save the image url to req
    req.imageUrl = result.secure_url

    next();
  } catch (error) {
    console.log('Error when uploading image', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error, cant upload image'
    })
  }
}

// export const deleteImage = async (imageUrl) => {
//   try {
//     if (!imageUrl) {
//       throw new Error('No image URL provided');
//     }
//     const parts = imageUrl.split('/');
//     const publicId = `${parts[parts.length - 2]}/${parts[parts.length - 1].split('.')[0]}`;

//     await cloudinary.api.delete_resources([publicId], {
//       type: 'upload',
//       resource_type: 'image'
//     });

//   } catch (error) {
//     console.error('Error while deleting image', error);
//     throw new Error('Error while deleting image');
//   }
// }

// export const updateImageProfile = async (req, res, next) => {
//   try {
//     const user = req.userData;
//     if (user.imageUrl) {
//       await deleteImage(user.imageUrl);
//     }
//     await uploadImage(req, res, next);
//     next();
//   } catch (error) {
//     console.log('Error in updateImageProfile middleware', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal Server Error'
//     })
//   }
// }