import express from "express";
import fs from "fs";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerFilePath = path.join(__dir, "registerRouter.js");

const registerRouter = express.Router();

// 1. GET ALL
registerRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// 2. GET SINGLE
registerRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// 3. UPDATE
registerRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// 4. DELETE
registerRouter.delete("/", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
