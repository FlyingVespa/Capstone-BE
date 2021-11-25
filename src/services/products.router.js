import express from "express";
import * as Controllers from "../controllers/products.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { isUnique } from "../middlewares/product.middlewares.js";
const productsRouter = express.Router();

productsRouter
  .route("products/:productId")
  .get(Controllers.getSingleProduct); /*works*/

productsRouter
  .route("/products")
  .post(isUnique, Controllers.addNewProduct)
  .put(Controllers.updateProduct)
  .delete(Controllers.deleteProduct);

export default productsRouter;
