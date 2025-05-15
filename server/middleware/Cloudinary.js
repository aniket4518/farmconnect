const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.Cloudname,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECREAT
});

/**
 * Uploads an image from ../images to Cloudinary, deletes it from disk, and returns the Cloudinary URL.
 * @param {string} filename - The filename in the ../images folder
 * @param {Object} options - Additional Cloudinary upload options (optional)
 * @returns {Promise<string>} - The Cloudinary image URL
 */
const uploadImageFromImagesFolder = async (filename, options = {}) => {
  const imagePath = path.join(__dirname, '..', 'images', filename);
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`File not found: ${imagePath}`);
    }

    const uploadOptions = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: 'products',
      ...options
    };

    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);

    // Delete the local file after successful upload
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting local file ${imagePath}:`, err);
      } else {
        console.log(`Deleted local file: ${imagePath}`);
      }
    });

    // Return the Cloudinary URL
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

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
  uploadImageFromImagesFolder,
  getCloudinaryUrl,
  cloudinary
};