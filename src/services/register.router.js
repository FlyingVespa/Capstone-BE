import express from "express";

import {
  isBusiness,
  isClient,
  urlIsUnique,
} from "../middlewares/register.middelware.js";
import * as Controllers from "../controllers/register.control.js";

const regsiterRouter = express.Router();

regsiterRouter
  .route("/")
  .post(isClient, isBusiness, urlIsUnique, Controllers.registerAccount);

export default regsiterRouter;
