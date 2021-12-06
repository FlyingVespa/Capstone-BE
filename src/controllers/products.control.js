import createError from "http-errors";
import q2m from "query-to-mongo";
import path from "path";
import multer from "multer";
import User from "../schema/user.schema.js";
import Product from "../schema/product.schema.js";
import cloudinary from "cloudinary";
import { productImgParser } from "../settings/cloudinary.js";

// 1. GET all
// 2. GET Single
// 3. POST Create Single
// 4. PUT Single
// 5. DELETE Single
// 6. REFRESH Token
// 7. LOGIN Single
// 8. LOUGOUT Single

// 1. GET ALL **************************************************************************************/
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next();
  }
};

// 1. GET ALL USER Product
export const getAllUserProducts = async (req, res, next) => {
  const userId = req.params.userId;
  const product = await Product.find({
    businessId: userId,
  });
  console.log(product);
  res.send(product);
};
// 2. GET Single USER PRODUCT
export const getSingleUserProduct = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const product = await Product.findOne({
    _id: productId,
    businessId: userId,
  });
  console.log(product);
  res.send(product);
};

// 2. POST Single
export const addNewProduct = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return next(createError(404, `User with id ${userId} not found`));
  }

  try {
    let result;
    if (req.file !== undefined && req.file.path !== undefined) {
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: `capstone/products/${userId}`,
      });
    }

    console.log(req.params);
    console.log(result);

    const newProductData = {
      ...req.body,
      businessId: userId,
      image:
        result?.url ||
        req.body?.image ||
        "https://via.placeholder.com/300/09f/fff.png",
      cloudinary_id: result?.public_id || "",
    };
    const newProduct = new Product(newProductData);
    const createdProduct = await newProduct.save();

    res.status(200).send(createdProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      next(createError(500, error));
    }
  }
};

//  PUT

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    console.log("productId", productId);
    const product = await Product.findById(productId);
    console.log("product", product);
    const userId = await product.businessId;
    console.log("userId", userId);
    let result;
    let destroy;
    try {
      if (
        product.cloudinary_id !== "" &&
        product.cloudinary_id !== "none" &&
        product.cloudinary_id !== undefined
      ) {
        console.log("dont call", product.cloudinary_id);
        destroy = await cloudinary.v2.uploader.destroy(product.cloudinary_id);
        console.log("destroy", destroy);
      }
    } catch (error) {
      console.log(error);
      throw new Error(3000);
    }
    if (req.file !== undefined && req.file.path !== undefined) {
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: `capstone/products/${userId}`,
      });
      console.log("result", result);
    }

    let image = "";
    let cloud_id = "";
    if (
      result !== undefined &&
      result.url !== undefined &&
      result.public_id !== undefined
    ) {
      image = result.url;
      cloud_id = result.public_id;
    } else if (req.body !== undefined && req.body.image !== undefined) {
      image = req.body.image;
      cloud_id = "none";
    }
    const data = {
      ...req.body,
      image: image,
      cloudinary_id: cloud_id,
    };
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    if (updatedProduct) {
      res.send(`🛠️ Updated successfully 🛠️ ${updatedProduct}`);
    } else {
      next(createError(404, `Product with _id ${productId} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, `An error occurred while updating product`));
  }
};
// DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    await cloudinary.v2.uploader.destroy(product.cloudinary_id);

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res
        .status(201)
        .send(`🚮 Product with _id ${productId}, successfully deleted`);
    } else {
      next(createError(404, `productId with _id ${productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
};
