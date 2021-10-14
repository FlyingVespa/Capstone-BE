import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";
import pdf from "html-pdf";
import pdfTemplate from "./services/pdfRouter/pdfTemplate";
import usersSchema from "./usersSchema.js";

const pdfRouter = express.Router();

// POST

pdfRouter.post("/:userId/stocklist", async (req, res, next) => {
  const userId = req.params.userId;
  pdf.create(pdfTemplate(req.data), {}).toFile("pricelist.pdf", (err) => {
    if (err) {
      return Promise.reject;
    }
    return Promise.resolve();
  });
});

// GET
pdfRouter.get("/:userId/stocklist", async (req, res, next) => {
  const userId = req.params.userId;
  res.sendFile(`${__dirname}/pricelist.pdf`);
});
export default pdfRouter;
