import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

// uploads a local file to Cloudinary and cleans up the temp file afterwards
// multer saves files to /uploads temporarily — this util handles the rest
// returns the Cloudinary response object on success, null on failure
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // resource_type: "auto" lets Cloudinary detect image/video/raw automatically
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // delete the temp file after successful upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // always clean up the temp file even if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadOnCloudinary };
