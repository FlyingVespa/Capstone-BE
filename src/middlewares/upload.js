import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";

const store = new GridFsStorage({
  url: process.env.MONGODB_CONNECT,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, res) => {
    const match = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

export default multer({store})