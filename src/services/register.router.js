import express from "express";
// import * as UserControllers from "../controllers/users.control.js";
// import * as ClientControllers from "../controllers/clients.control.js";
import { isBusiness, isClient } from "../middlewares/register.middelware.js";
import * as Controllers from "../controllers/register.control.js";

const regsiterRouter = express.Router();

regsiterRouter
  .route("/")
  .post(isBusiness, isClient, Controllers.registerAccount);
// regsiterRouter
//   .route("/business")
//   .post(isBusiness, isClient, UserControllers.registerUser);

export default regsiterRouter;
