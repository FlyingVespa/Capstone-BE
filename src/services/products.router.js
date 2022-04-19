import express from "express";
import * as Controllers from "../controllers/products.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { isUnique } from "../middlewares/product.middlewares.js";

const productsRouter = express.Router();

productsRouter.route("/products").get(Controllers.getAllProducts);
productsRouter
  .route("/business/:userId/products")
  .post(isUnique, Controllers.addNewProduct)
  .get(Controllers.getUserProducts);
productsRouter
  .route("/business/:userId/products/:productId")
  .get(Controllers.getSingleProducts)
  .put(Controllers.updateProduct)
  .delete(Controllers.deleteProduct)
  .post(Controllers.uploadProductImage);

export default productsRouter;
