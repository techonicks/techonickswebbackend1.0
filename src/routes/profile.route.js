import { Router } from "express";
import { createPost, editBio } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const profileRoute = Router();

profileRoute.route("/createPost").post(upload.single("image"), createPost);
profileRoute.route("/editBio").post(editBio);

export { profileRoute };
