import express from "express";
import { JWTAuthenticate, refreshTokens} from "../../auth/tools.js";
import * as Controllers from "../../controllers/users.js";
import { usersImgParser } from "../../settings/cloudinary.js";

const usersRouter = express.Router();

usersRouter.route("/").get(Controllers.getAllUsers)
usersRouter.route("/").post(Controllers.registerUser)
usersRouter.route("/me", JWTAuthenticate, Controllers.getMe)
usersRouter.route("/:userID")
    .get(JWTAuthenticate, Controllers.getSingleUser)
    .post(JWTAuthenticate, Controllers.updateUser)
    .delete(JWTAuthenticate, Controllers.deleteUser)

usersRouter.route("/:userID/upload", JWTAuthenticate, usersImgParser.single("userImg"), Controllers.uploadUserProfileImage)

export default usersRouter;

