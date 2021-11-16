import express from "express";
import { JWTAuthenticate } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/clients.control.js";
import { usersImgParser } from "../settings/cloudinary.js";

const clientsRouter = express.Router();

clientsRouter.route("/").get(Controllers.getAllClients);
clientsRouter
  .route("/:clientId")
  .get(Controllers.getSingleClient)
  .put(Controllers.updateClient)
  .delete(Controllers.deleteClient);

export default clientsRouter;
