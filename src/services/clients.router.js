import express from "express";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/clients.control.js";
// import { usersImgParser } from "../settings/cloudinary.js";

const clientsRouter = express.Router();

clientsRouter.route("/").get(Controllers.getAllClients);
clientsRouter.route("/:clientId").get(Controllers.getSingleClient);
clientsRouter
  .route("/me")
  .get(loginMiddleware, Controllers.getMe)
  .post(loginMiddleware, Controllers.updateClient)
  .delete(loginMiddleware, Controllers.deleteClient);

export default clientsRouter;
