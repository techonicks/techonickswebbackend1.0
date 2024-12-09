import { Router } from "express";
import { createUser } from "../controllers/userCreate.controller.js";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth.middleware.js";
import { findUserByToken, login, logout } from "../controllers/userAuth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { createEvent } from "../controllers/events.controller.js";

const userRouter = Router();

userRouter.route("/register").post(upload.single("avatar"),createUser);
userRouter.route("/login").post(isLoggedIn,login)
userRouter.route("/logout").post(logout)
userRouter.route('/profile').post(isAuthenticated,findUserByToken)
userRouter.route("/createEvent").post(upload.single("image"),isAdmin,createEvent)

export { userRouter }
