import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";

import userSchema from "./usersSchema";

const usersRouter = express.Router();

// 1. GET ALL

usersRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {}
});

// 2. GET SINGLE

usersRouter.get("/:userId", async (req, res, next) => {
  try {
  } catch (error) {}
});

// 3. CREATE SINGLE

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new userSchema(req.body);
    const { _id } = await newUser.save();

    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

// 4. UPDATE SINGLE

usersRouter.put("/:userId", (req, res, next) => {
  try {
  } catch (error) {}
});

// 5. DELETE SINGLE
usersRouter.delete("/:userId", (req, res, next) => {
  try {
  } catch (error) {}
});

export default usersRouter;
