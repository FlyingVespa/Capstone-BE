import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";

import usersSchema from "./usersSchema.js";

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
    const newUser = new usersSchema(req.body); // here happens validation of the req.body, if it is not ok Mongoose will throw a "ValidationError"
    const { _id } = await newUser.save(); // this is where the interaction with the db/collection happens

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
