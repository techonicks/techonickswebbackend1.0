import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const uploadFile = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const localFilePath = path.join(__dirname, "/content/temp.jpg");
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    unlink(localFilePath,(err)=>{
      console.log(err);
    });
    return response.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadFile;
