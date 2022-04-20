import express from "express";
import * as Controllers from "../controllers/products.control.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { isUnique } from "../middlewares/product.middlewares.js";
import { productImgUpload } from "../settings/cloudinary.js";

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
  .delete(Controllers.deleteProduct);
productsRouter
  .route("/business/:userId/products/:productId/upload")
  .post(
    isUnique,
    productImgUpload.single("image"),
    Controllers.uploadProductImage
  );

export default productsRouter;
