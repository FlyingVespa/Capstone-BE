import express from "express";
// import { JWTAuthenticate } from "../middlewares/login.middleware.js";
import * as Controllers from "../controllers/products.control.js";
import { isUnique } from "../middlewares/product.middlewares.js";
const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(Controllers.getAllProducts) /*works*/
  .post(isUnique, Controllers.addNewProduct);

productsRouter
  .route("/:productId")
  .get(Controllers.getSingleProduct)
  .put(Controllers.updateProduct)
  .delete(Controllers.deleteProduct);

export default productsRouter;
