import createError from "http-errors";
import q2m from "query-to-mongo";

import User from "../schema/user.schema.js";
import Product from "../schema/product.schema.js";

// 1. GET all
// 2. GET Single
// 3. POST Create Single
// 4. PUT Single
// 5. DELETE Single

// 1. GET ALL **************************************************************************************/
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next();
  }
};
// 2. GET Single

export const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      res.send(product);
    } else {
      next(createError(404, `Product not found!`));
    }
  } catch (error) {
    next(createError(500, "An error occurred while retrieving product "));
  }
};

// 2. POST Single
export const addNewProduct = async (req, res, next) => {
  try {
    const userId = { url: req.params.userId };
    const user = await User.findOne(userId);
    if (!user)
      return next(createError(404, `User with id ${userId} not found`));
    const newProductData = { ...req.body };
    const newProduct = new Product(newProductData);
    const createdProduct = await newProduct.save();

    res.status(201).send(createdProduct);
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
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedProduct) {
      res.send(`🛠️ Updated successfully 🛠️ ${updatedProduct}`);
    } else {
      next(createError(404, `Product with _id ${productId} not found!`));
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating product`));
  }
};
// DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res
        .status(204)
        .send(`🚮 Product with _id ${productId}, successfully deleted`);
    } else {
      next(createError(404, `productId with _id ${productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
};

export const uploadProductImage = async (req, res, next) => {
  try {
    let image;
    if (req.body.url) {
      image = req.body.url;
    } else {
      image = req.file.path;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { image: image },
      { new: true }
    );
    if (!updatedProduct)
      return next(
        createError(404, `Product with id ${req.params.productId} not found`)
      );
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
