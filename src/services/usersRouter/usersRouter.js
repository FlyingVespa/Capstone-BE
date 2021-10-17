import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";
import { basicAuthMiddleware } from "../../auth/auth.js";
import usersSchema from "./usersSchema.js";

const usersRouter = express.Router();

// 1. GET ALL

usersRouter.get("/", basicAuthMiddleware, async (req, res, next) => {
  try {
    const users = await usersSchema.find();
    res.send(users);
  } catch (error) {
    next();
  }
});

// 2. GET SINGLE No AUTH

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await usersSchema.find(userId);

    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

// 3. GET LOGGEDIN USER
usersRouter.get("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// 4. CREATE NEW USER ************************************************//
usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new usersSchema(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
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
    const modifiedUser = await usersSchema.findByIdAndUpdate(userId, req.body, {
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
    const deleteUser = await usersSchema.findByIdAndDelete(userId);
    if (deleteUser) {
      res.status(204).send();
    } else {
      throw createError(404, `User wit id ${userId} not found`);
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
