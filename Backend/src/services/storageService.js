const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary and returns the secure URL.
 * 
 * @param file The multer file object containing the buffer
 * @param folder The folder in the bucket (e.g., "images", "pdfs")
 */
const uploadFile = async (file, folder) => {
  if (!file || !file.buffer) return "";
  
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

module.exports = {
  uploadFile,
};

