import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadImageOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: 'MERNBlog',
      resource_type: "auto"
    })
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath)
    return response.secure_url;

  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}

export const deleteImageOnCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null

    const parts = imageUrl.split('/');
    const publicId = `${parts[parts.length - 2]}/${parts[parts.length - 1].split('.')[0]}`;
    await cloudinary.api.delete_resources([publicId], {
      type: 'upload',
      resource_type: 'image'
    });

  } catch (error) {
    console.log('Error while deleting image', error);
    // if cant delete the image on cloudinary we just return null because we don't want to block the process, console the error is enough
    return null
  }
}

export const updateImage = async (localFilePath, oldImageUrl) => {
  await deleteImageOnCloudinary(oldImageUrl);
  return await uploadImageOnCloudinary(localFilePath);
}