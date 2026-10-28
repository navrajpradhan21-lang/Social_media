import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";

const uploadOnCloudinary = async (file) => {
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    const missingConfig = Object.entries(config)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingConfig.length > 0) {
      throw new Error(
        `Missing Cloudinary configuration: ${missingConfig.join(", ")}`
      );
    }

    cloudinary.config(config);

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    console.log("Cloudinary upload successful:", result.public_id);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", {
      message: error.message,
      http_code: error.http_code,
      name: error.name,
      errorDetails: error.error,
    });

    throw error;
  } finally {
    // Clean up the temporary local file.
    if (file) {
      await fs.unlink(file).catch((cleanupError) => {
        if (cleanupError.code !== "ENOENT") {
          console.error("Temporary file cleanup failed:", cleanupError.message);
        }
      });
    }
  }
};

export default uploadOnCloudinary;
