import express from "express";
import {JWTAuthenticate} from "../../middlewares/login.middleware.js"
import * as Controllers from "../../controllers/clients.control.js";
import { usersImgParser } from "../../settings/cloudinary.js";

const clientsRouter = express.Router();


clientsRouter
  .route("/me")
  .get(JWTAuthenticate, Controllers.getMe)
  .post(JWTAuthenticate, Controllers.getMe)
  .put(JWTAuthenticate, Controllers.getMe)
  .delete(JWTAuthenticate, Controllers.getMe);

// clientsRouter
//     .route("/me/favorites")  
//     .get(JWTAuthenticate, Controllers)
//     .post(JWTAuthenticate, Controllers)
//     .put(JWTAuthenticate, Controllers)
//     .delete(JWTAuthenticate, Controllers);

// clientsRouter
//     .route("/me/cart") 
//     .get(JWTAuthentication, Controllers)
//     .post(JWTAuthentication, Controllers)
//     .put(JWTAuthentication, Controllers)
//     .delete(JWTAuthentication, Controllers);   




// clientsRouter.route(
//   "/:userID/upload",
//   JWTAuthenticate,
//   usersImgParser.single("userImg"),
//   Controllers.uploadUserProfileImage
// );

export default clientsRouter;
