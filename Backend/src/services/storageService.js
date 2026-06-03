const path = require("path");
const fs = require("fs");

/**
 * Uploads a file buffer to local VPS storage and returns the relative URL.
 * 
 * @param file The multer file object containing the buffer
 * @param folder The folder in the storage (e.g., "images", "pdfs")
 */
const uploadFile = async (file, folder) => {
  if (!file || !file.buffer) return "";

  try {
    const uploadDir = path.join(__dirname, '../../uploads', folder);

    // Ensure the directory exists
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // Generate a unique filename using timestamp and a random number
    const ext = path.extname(file.originalname || '');
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Write the file to disk
    await fs.promises.writeFile(filePath, file.buffer);

    // Return the relative URL (e.g. /uploads/images/filename.jpg)
    return `/uploads/${folder}/${filename}`;
  } catch (error) {
    console.error("Local Storage Error:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
};

