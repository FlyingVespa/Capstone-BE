import dotenv from "dotenv";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// USERS
// const usersImgStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "business/img/users",
//   },
// });
// export const usersImgParser = multer({ storage: usersImgStorage });

// EXPERIENCES
// const expImgStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "business/Img/Experiences",
//   },
// });
// export const expImgParser = multer({ storage: expImgStorage });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req) => `CAPSTONE/products/${req.params.userId}`,
    public_id: (req) => `${req.params.productId}`,
  },
});

export const productImgUpload = multer({ storage: productStorage });
