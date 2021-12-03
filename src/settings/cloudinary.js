import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import multerCloudinary from "multer-storage-cloudinary";
import multer from "multer";
const { CloudinaryStorage } = multerCloudinary;
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const user = req.params.userId;
    return {
      folder: `capstone/products/${user}`,
      public_id: Date.now() + file.orginalname,
    };
  },
});
export const productImgParser = multer({ storage: productStorage });

const userAvatarStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `capstone/users/avatar`,
    };
  },
});
export const userAvatarParser = multer({ storage: userAvatarStorage });

const userBannerStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `capstone/users/banner`,
    };
  },
});
export const userBannerParser = multer({ storage: userBannerStorage });

const userLogoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `capstone/users/logo`,
    };
  },
});
export const userLogoParser = multer({ storage: userLogoStorage });
