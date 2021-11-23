import express from "express";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/users.control.js";

const usersRouter = express.Router();

usersRouter.route("/").get(Controllers.getAllUsers);
usersRouter.route("/me").get(loginMiddleware, Controllers.getMe);
// .post(loginMiddleware, Controllers.getMe)
// .put(loginMiddleware, Controllers.updateUser)
// .delete(loginMiddleware, Controllers.deleteUser);
usersRouter.route("/:userId").get(Controllers.getSingleUser);

export default usersRouter;
