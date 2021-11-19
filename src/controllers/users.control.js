import express, { request } from "express";
import createError from "http-errors";

import {
  JWTAuthenticate,
  refreshTokens,
} from "../middlewares/login.middleware.js";
import User from "../schema/user.schema.js";
// 1. GET all
// 2. GET Single
// 3. POST Create Single
// 4. PUT Single
// 5. DELETE Single
// 6. REFRESH Token
// 7. LOGIN Single
// 8. LOUGOUT Single

// 1. GET ALL **************************************************************************************/
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next();
  }
};

// 2. GET SINGLE LOGGEDIN with Auth **************************************************************************************/

export const getMe = async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};

// 2. GET SINGLE SPECIFIC USER **************************************************************************************/

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findbyId(userId);
    if (!user) {
      return next(
        createError(404, `User with ID: ${req.params.userId} not found`)
      );
    } else {
      res.send(req.user);
    }
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE SINGLE **************************************************************************************/

export const updateUser = async (req, res, next) => {
  const update = { ...req.body, updatedAt: Date.now() };
  try {
    const updatedUser = await User.findbyIDandUpdate(
      req.params.userId,
      update,
      { new: true, runValidators: true }
    );
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
  try {
    await User.findByIdAndDelete(req.user._id);
    await req.user.deleteOne();
    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
};

// 6. REFRESH TOKEN ************************************************************************************/
export const refreshToken = async (req, res, next) => {
  try {
    const { actualRefreshToken } = req.body;
    const { accessToken, refreshToken } = await refreshTokens(
      actualRefreshToken
    );
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

// 7. LOGIN **************************************************************************************/

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.checkCredentials(email, password);
    if (user) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user);
      res.send({ accessToken, refreshToken });
    } else {
      next(createError(401, "Credentials not valid!"));
    }
  } catch (error) {
    next(error);
  }
};

// 8. LOUGOUT **************************************************************************************/
export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("context", { httpOnly: true });
    res.redirect(301, "/login");
  } catch (error) {
    next(error);
  }
};
