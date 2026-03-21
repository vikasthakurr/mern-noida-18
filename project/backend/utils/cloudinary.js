import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Uploads a local file to Cloudinary and deletes the local file.
 * @param {string} localFilePath - Path to the local file.
 * @returns {Promise<object|null>} - Cloudinary upload response or null on error.
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);
    
    // remove the locally saved temporary file
    fs.unlinkSync(localFilePath);
    
    return response;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadOnCloudinary };
