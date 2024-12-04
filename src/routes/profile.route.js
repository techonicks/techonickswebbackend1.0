import { Router } from "express";
import { editBio } from "../controllers/profileEdit.controller.js";

const profileRoute = Router();

profileRoute.route("/editBio").post(editBio);

export { profileRoute };
