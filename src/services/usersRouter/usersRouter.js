import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";

import usersSchema from "./usersSchema.js";

const usersRouter = express.Router();

// 1. GET ALL

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await usersSchema.find();
    res.send(users);
  } catch (error) {}
});

// 2. GET SINGLE

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await usersSchema.findById(userId);
    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

// 3. CREATE NEW USER ************************************************//
usersRouter.post("/", async (req, res, next) => {
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

// 4. UPDATE SINGLE

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

// 5. DELETE SINGLE
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
