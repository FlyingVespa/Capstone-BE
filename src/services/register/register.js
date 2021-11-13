import express from "express";
import * as UserControllers from "../../controllers/users.control.js";
import * as ClientControllers from "../../controllers/clients.control.js";
import {isBusiness, isClient} from "../../middlewares/register.middelware.js"

const regsiterRouter = express.Router();

regsiterRouter
  .route("/client")
  .post(isBusiness, isClient, ClientControllers.registerClient);
regsiterRouter
  .route("/business")
  .post(isBusiness, isClient, UserControllers.registerUser);

export default regsiterRouter;
