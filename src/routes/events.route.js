import { Router } from "express";
import { registerForEvent } from "../controllers/events.controller.js";

const eventRouter = Router()

eventRouter.route("/register").post(registerForEvent)

export { eventRouter }