import express from "express";
import { JWTAuthenticate } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/users.control.js";
import { usersImgParser } from "../settings/cloudinary.js";

const usersRouter = express.Router();

usersRouter.route("/").get(Controllers.getAllUsers);
usersRouter.route("/me").get(JWTAuthenticate, Controllers.getMe)
  .post(JWTAuthenticate, Controllers.getMe)
  .put(JWTAuthenticate, Controllers.getMe)
  .delete(JWTAuthenticate, Controllers.getMe);
usersRouter
  .route("/:userId")
  .get(JWTAuthenticate, Controllers.getSingleUser)



export default usersRouter;
