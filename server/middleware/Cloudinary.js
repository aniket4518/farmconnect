const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

/**
 * Uploads an image to Cloudinary and deletes the local file after successful upload
 * @param {string} imagePath - Path to the image file
 * @param {Object} options - Additional Cloudinary upload options
 * @returns {Promise<Object>} - Cloudinary upload result with image URLs and details
 */
const uploadToCloudinaryAndDelete = async (imagePath, options = {}) => {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`File not found at path: ${imagePath}`);
    }

    // Default options merged with provided options
    const uploadOptions = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: 'products',
      ...options
    };

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);
    console.log('Image uploaded to Cloudinary:', result.public_id);

    // Delete the local file after successful upload
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting local file ${imagePath}:`, err);
      } else {
        console.log(`Successfully deleted local file: ${imagePath}`);
      }
    });

    // Return the complete result (contains URLs, public_id, etc.)
    return result;
  } catch (error) {
    console.error('Error in Cloudinary upload:', error);
    throw error;
  }
};

/**
 * USAGE EXAMPLE:
 * 
 * 1. For a single file upload with multer:
 *    const result = await uploadToCloudinaryAndDelete(req.file.path);
 * 
 * 2. For multiple files:
 *    const uploadPromises = req.files.map(file => uploadToCloudinaryAndDelete(file.path));
 *    const results = await Promise.all(uploadPromises);
 */

/**
 * Get a Cloudinary URL for the image with optional transformations
 * @param {string} publicId - Cloudinary public_id of the image
 * @param {Object} options - Cloudinary transformation options
 * @returns {string} - Transformed image URL
 */
const getCloudinaryUrl = (publicId, options = {}) => {
  const defaultOptions = {
    fetch_format: 'auto',
    quality: 'auto',
    ...options
  };
  
  return cloudinary.url(publicId, defaultOptions);
};

module.exports = {
  uploadToCloudinaryAndDelete,
  getCloudinaryUrl,
  cloudinary
};