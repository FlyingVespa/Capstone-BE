import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import userSchema from "./usersSchema.js";
import {
  basicAuthMiddleware,
  JWTAuthMiddleware,
} from "../../auth/middlewares.js";
import { adminOnly } from "../../auth/admin.js";
import { JWTAuthenticate, refreshTokens } from "../../auth/tools.js";
import User from "./usersSchema.js";

const usersRouter = express.Router();

// 1. GET ALL

usersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next();
  }
});

// 2. GET SINGLE No AUTH

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

// 4. CREATE NEW USER ************************************************//
usersRouter.post("/register", async (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({
          email: "Email already registered, continue to login",
        });
      } else {
        const newUser = new User(req.body);
        const { _id } = newUser.save();
        return res.status(201).json({ msg: newUser });
      }
    });
    // const newUser = new User(req.body);
    // const { _id } = await newUser.save();
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
});

// 5. UPDATE SINGLE

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const modifiedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (modifiedUser) {
      res.send(modifiedUser);
    } else {
      next(createError(404, `User wit id ${userId} not found`));
    }
  } catch (error) {}
});

// 6. DELETE SINGLE
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      res.status(204).send();
    } else {
      throw createError(404, `User with id ${userId} not found`);
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1. verify credentials
    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      // 2. Generate tokens if credentials are ok
      const { accessToken, refreshToken } = await JWTAuthenticate(user);
      // 3. Send tokens back as a response
      res.send({ accessToken, refreshToken });
    } else {
      next(createError(401, "Credentials not valid!"));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/refreshToken", async (req, res, next) => {
  try {
    const { actualRefreshToken } = req.body;

    // 1. Check the validity (and the integrity) of the refresh token, if everything is ok we can create a new pair of access and refresh token
    const { accessToken, refreshToken } = await refreshTokens(
      actualRefreshToken
    );
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});
export default usersRouter;
