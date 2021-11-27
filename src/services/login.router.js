import express from "express";
import * as Controllers from "../controllers/login.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
const loginRouter = express.Router();

loginRouter.route("/login").post(Controllers.loginUser);
loginRouter.route("/refreshToken").post(Controllers.refresh);
loginRouter.route("/logout").get(loginMiddleware, Controllers.userLogout);

export default loginRouter;
