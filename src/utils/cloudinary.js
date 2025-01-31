import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js";
import { unlink } from "fs/promises";

import { errorHandler } from "./errorHandler.js";

cloudinary.config({
  cloud_name: "dtiooibe8",
  api_key: "398418721558265",
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const fileUploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) throw errorHandler("Please select images.", 422);
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    await unlink(filePath);
    return res.url;
  } catch (error) {
    await unlink(filePath);
    throw errorHandler("File upload failed.");
  }
};
