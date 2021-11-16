import express from "express";
import { JWTAuthenticate } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/clients.control.js";

const productsRouter = express.Router();

productsRouter.route("/products");
// .get(Controllers.getSingleProduct)
// .post(JWTAuthenticate, Controllers.getMe)
// .put(JWTAuthenticate, Controllers.getMe)
// .delete(JWTAuthenticate, Controllers.getMe);
// router.get("/", Controllers.getAllPosts);
// router.get("/:postId", validateObjectId, Controllers.getSinglePost);
// router.post("/", Controllers.addNewPost);
// router.put("/:postId", validateObjectId, Controllers.editPost);
// router.delete("/:postId", validateObjectId, Controllers.deletePost);
// router.post(
//   "/:postId/uploadImage",
//   validateObjectId,
//   postsImgParser.single("postImg"),
//   Controllers.uploadPostImage
// );
// router.post(
//   "/:postId/like",
//   validateObjectId,
//   userExists("body"),
//   postExists("params"),
//   Controllers.likedPost
// );

export default productsRouter;
