import createError from "http-errors";

import User from "../schema/user.schema.js";
import Product from "../schema/product.schema.js";
import { v2 as cloudinary } from "cloudinary";
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
    console.log("products", products);
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// 2. GET Single

export const getUserProducts = async (req, res, next) => {
  const productId = req.params.userId;
  const product = await Product.find({ businessId: productId });
  res.send(product);
  //   if (product) {
  //     res.send(product);
  //   } else {
  //     next(createError(404, `Product not found!`));
  //   }
  // } catch (error) {
  //   next(createError(500, "An error occurred while retrieving product "));
  // }
};
export const getSingleProducts = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const product = await Product.find({ businessId: userId, _id: productId });
  res.send(product);
  //   if (product) {
  //     res.send(product);
  //   } else {
  //     next(createError(404, `Product not found!`));
  //   }
  // } catch (error) {
  //   next(createError(500, "An error occurred while retrieving product "));
  // }
};

// 2. POST Single
export const addNewProduct = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, `User with id ${userId} not found`));
    }

    const newProductData = {
      ...req.body,
      businessId: user,
      image: `https://eu.ui-avatars.com/api/?name=${req.body.name}`,
      cloudinary_id: "none",
    };

    const newProduct = new Product(newProductData);
    const createdProduct = await newProduct.save();

    await user.products.push(createdProduct);
    user.save();
    res.status(201).send(createdProduct);
    console.log("CP", createdProduct);
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
    const product = await Product.findById(productId);

    if (product) {
      const user = await User.findById(product.businesId);
      await cloudinary.uploader.destroy(
        `CAPSTONE/products/${product.businessId}/${productId}`
      );
      await product.remove();
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
// export const deleteMany = async (req, res, next) => {
//   try {
//     const productIds = req.body.productarray;
//     const deletedProduct = await Product.deleteMany({
//       _id: { $in: [productIds] },
//     });
//     if (deletedProduct) {
//       res
//         .status(204)
//         .send(`🚮 Products with _ids' ${productIds}, successfully deleted`);
//     } else {
//       next(createError(404, `productId with _id ${productIds} not found!`));
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const uploadProductImage = async (req, res, next) => {
  try {
    let image;

    if (req.body.url) {
      image = req.body.url;
    } else {
      image = req.file.path;
    }

    console.log(image);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { image: image },
      { new: true }
    );
    if (!updatedProduct)
      return next(
        createError(404, `Product with id ${req.params.productId} not found`)
      );
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
};
