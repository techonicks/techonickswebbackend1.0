import { v2 as cloudinary } from "cloudinary";

const uploadFile = async (content) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);
  // const localFilePath = path.join(__dirname, "../../tmp/temp.jpg");
  try {
    if (!content) return null;
    const response = await cloudinary.uploader.upload(content, {
      resource_type: "auto",
    });
    return response.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadFile;
