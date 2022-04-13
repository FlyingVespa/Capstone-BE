import express, { request } from "express";
import createError from "http-errors";

import { getTokens, refreshTokens } from "../middlewares/login.middleware.js";
import User from "../schema/user.schema.js";
import Product from "../schema/product.schema.js";
// 1. GET all
// 2. GET Single
// 4. PUT Single
// 5. DELETE Single

// 1. GET ALL **************************************************************************************/
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

// 2. GET SINGLE LOGGEDIN with Auth **************************************************************************************/

export const getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

// 2. GET SINGLE SPECIFIC USER **************************************************************************************/

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    User.findById(userId)
      .populate({ path: "products", model: "Product" })
      .exec((err, result) => {
        if (err) {
          console.log("err", err);
          return res.send({ error: err });
        }
        console.log("result", result);
        res.send({ result: result });
      });
  } catch (error) {
    next(error);
  }
};

// export const getSingleUser = (req, res, next) => {
//   let userId = req.params.userId;
//   User.findOne({ userId })
//     .populate({ path: "products", model: "Product" })
//     .exec((err, product) => {
//       console.log(product);
//     });
// };

// 4. UPDATE SINGLE **************************************************************************************/

export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  // const userUrl = { url: req.params.userId };
  const update = { ...req.body, updatedAt: Date.now() };
  try {
    const updatedUser = await User.findById(userId, update, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    await req.user.save();
    res.send("Updated successfully");
  } catch (error) {
    next(error);
  }
};

// 5. DELETE SINGLE **************************************************************************************/
export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  // const userUrl = { url: req.params.userId };
  try {
    await User.findByIdAndDelete(userId);
    await req.user.deleteOne();
    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
};
