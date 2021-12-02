import express from "express";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import Image from "../schema/image.schema.js";
import multerCloudinary from "multer-storage-cloudinary";
import multer from "multer";
const { CloudinaryStorage } = multerCloudinary;

const imgRouter = express.Router();

// const productStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: `capstone/products`,
//   },
// });
// export const productParser = multer({ storage: productStorage });

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // const user = await req.params.user;
    return {
      folder: `capstone/products`,
    };
  },
});
export const productParser = multer({ storage: productStorage });

// imgRouter.post(
//   `/upload`,
//   productParser.single("image"),
//   async (req, res, next) => {
//     console.log(req.file);

//     res.status(200).send({ file: req.file });
//   }
// );

export default imgRouter;
