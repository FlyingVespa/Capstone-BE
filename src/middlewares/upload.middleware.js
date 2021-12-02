import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECT,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-product-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "product-img",
//       filename: `${Date.now()}-product-${file.originalname}`,
//     };
//   },
// });
// export let upload = multer({ storage });

// const userStorage = new GridFsStorage({
//   url: process.env.MONGODB_CONNECT,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-user-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "user-img",
//       filename: `${Date.now()}-user-${file.originalname}`,
//     };
//   },
// });
// export let up = multer({ userStorage });

//multer.diskStorage() creates a storage space for storing files.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "./files/images/");
    } else {
      cb({ message: "this file is neither a video or image file" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export let upload = multer({ storage: storage });
