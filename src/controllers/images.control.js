import express from "express";
import multer from "multer";

const imgRouter = express.Router();

imgRouter.post(
  "/imageupload",
  multer().single("img"),
  async (res, req, next) => {
    try {
      console.log(req.file);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default imgRouter;
