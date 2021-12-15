import express from "express";
import * as Controllers from "../controllers/products.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import {
  isUnique,
  verifyIfUnique,
} from "../middlewares/product.middlewares.js";

import { productImgParser } from "../settings/cloudinary.js";
import multer from "multer";

const productsRouter = express.Router();

productsRouter.route("/me/products");

productsRouter
  .route("/:userId/products")
  .get(Controllers.getAllUserProducts)
  .post(isUnique, productImgParser.single("image"), Controllers.addNewProduct);

productsRouter
  .route("/:userId/products/:productId")
  .patch(productImgParser.single("image"), Controllers.updateProduct)
  .get(Controllers.getSingleUserProduct)
  .delete(Controllers.deleteProduct);

productsRouter.route("/me/products/:productId");

export default productsRouter;
