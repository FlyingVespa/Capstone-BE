import express from "express";
import * as Controllers from "../controllers/login.control.js";
import { JWTAuthenticate } from "../middlewares/login.middleware.js";
const loginRouter = express.Router();

loginRouter.route("/").post(JWTAuthenticate, Controllers.loginUser);

export default loginRouter;
