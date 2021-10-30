// import express from "express";
// // import upload from '../middlewares/upload';


// const PORT = process.env.PORT || 4444;
// const filesRouter = express.Router();

// filesRouter.post("/:userID/upload", upload.single("file"), (req, res) => {
//   if (req.file === undefined) {
//     return res.send(" You must select a file.");
//     const imgUrl = `http:localhoset:${PORT}/business/:userID/file/${req.file.filename}`;
//     return res.send(imgUrl);
//   }
// });

// export default filesRouter