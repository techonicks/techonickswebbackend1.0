import { Router } from "express";
import { getMembers } from "../controllers/members.controller.js";

const membersRoute = Router()

membersRoute.route("/getAllMembers").post(getMembers)

export { membersRoute }