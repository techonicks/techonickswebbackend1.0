import { Router } from "express";
import { demoController } from "../controllers/test.controller.js";

const testRouter = Router();

testRouter.route("/").get(demoController);

export { testRouter };
