import { app } from "./app.js";
import connectDb from "./config/db/db.config.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
