import express from "express";
import * as Controllers from "../controllers/products.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { isUnique } from "../middlewares/product.middlewares.js";
// import { test } from "../settings/cloudinary";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const productsRouter = express.Router();

productsRouter.route("/products").get(Controllers.getAllProducts);

productsRouter
  .route("/:userId/products")
  .get(Controllers.getAllUserProducts)
  .post(isUnique, Controllers.addNewProduct);

productsRouter
  .route("/:userId/products/:productId")
  .get(Controllers.getSingleUserProduct)
  .put(Controllers.updateProduct)
  .delete(Controllers.deleteProduct);

export default productsRouter;
