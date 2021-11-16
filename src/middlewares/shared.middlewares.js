import mongoose from "mongoose";
import createError from "http-errors";
import jwt from "jsonwebtoken";

import UsersSchema from "../services/users/usersSchema,js";
import ClientsSchema from "../schema/client.schema.js";
import ProductsSchema from "../schema/productsSchema.js";
export const validateObjectId = async (req, res, next) => {
  if (req.params.userId) {
    if (!mongoose.isValidObjectId(req.params.userId))
      return next(createError(400, "Invalid user ID"));
  }
  if (req.params.postId) {
    if (!mongoose.isValidObjectId(req.params.productId))
      return next(createError(400, "Invalid post ID"));
  }
  if (req.params.expId) {
    if (!mongoose.isValidObjectId(req.params.clientId))
      return next(createError(400, "Invalid experience ID"));
  }

  next();
};

export const userExists = (field) => {
  return async (req, res, next) => {
    const userId = req[field].userId;
    if (!mongoose.isValidObjectId(userId))
      return next(createError(400, "Invalid account ID"));
    const user = await UsersSchema.findById(userId);
    const client = await ClientsSchema.findById(userId);
    if (!user && !client)
      next(createError(404, `Account with id ${userId} not found`));
    else next();
  };
};

export const productExists = (field) => {
  return async (req, res, next) => {
    const productId = req[field].productId;
    if (!mongoose.isValidObjectId(productId))
      return next(createError(400, "Invalid post ID"));
    const product = await ProductsSchema.findById(productId);
    if (!product)
      next(createError(404, `Product with id ${productId} not found`));
    else next();
  };
};
