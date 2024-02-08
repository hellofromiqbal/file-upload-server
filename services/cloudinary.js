import dotenv from 'dotenv';
import { v2 as cloudinaryV2 } from 'cloudinary';

dotenv.config();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinaryV2.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

export const uploadToCloudinary = async (path, folder = "unireadImages") => {
  try {
    const data = await cloudinaryV2.uploader.upload(path, { folder });
    return { url: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error(error);
    throw error;
  };
};
