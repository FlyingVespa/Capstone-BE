import createError from "http-errors";
import q2m from "query-to-mongo";

import User from "../schema/user.schema.js";
import Product from "../schema/product.schema.js";

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
    const query = q2m(req.query);
    const totalProducts = await Product.countDocuments(query.criteria);
    const products = await Product.find().populate({
      path: "userId",
      select: "-password",
    });
    res.send({
      links: query.links("/products", totalProducts),
      totalProducts,
      products,
    });
  } catch (error) {
    next(createError(500, "An error occurred while retrieving products "));
  }
};
// 2. GET Single

export const getSinglePost = async (req, res, next) => {
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
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user)
      return next(createError(404, `User with id ${userId} not found`));

    const newProductData = {
      product: req.body.product,
      businessname: user.businessname,
      userId: userId,
    };

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
export const editProduct = async (req, res, next) => {
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
      res.send(updatedProduct);
    } else {
      next(createError(404, `Product with _id ${productId} not found!`));
    }
  } catch (error) {
    next(
      createError(
        500,
        `An error occurred while updating post ${req.params.productId}`
      )
    );
  }
};
// DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.postId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res
        .status(204)
        .send(`🚮 Product with _id ${productId}, successfully deleted`);
    } else {
      next(createError(404, `productId with _id ${productId} not found!`));
    }
  } catch (error) {
    next(createError(500, error));
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
