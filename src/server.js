import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import bodyParser from "body-parser";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import GridFS from "gridfs-stream";
import methodOveride from "method-override";
import { fileURLToPath } from "url";

import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";
import { getCurrentFolderPath } from "../lib/fs-tools.js";
import usersRouter from "./services/usersRouter/usersRouter.js";
import filesRouter from "./services/filesRouter/filesRouter.js"
// import pdfRouter from "./services/pdfRouter/pdfRouter";

const { PORT, MONGODB_CONNECT } = process.env;
const server = express();

// server.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );

const publicFolder = getCurrentFolderPath(import.meta.url)
server.use(cors());

server.use(express.json());
// server.use.apply(methodOveride("_method"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
console.log(listEndpoints(server));

// * ENDPOINTS ****************************************************************//
// server.use("/");
server.use("/business", usersRouter);
server.use("/business", filesRouter)
// server.use("/business", pdfRouter);

// * ERROR MIDDLEWARES ******************************************************//
server.use(unAuthorizedHandler);
server.use(forbiddenErrHandler);
server.use(serverErrHandler);
server.use(badReqErrHandler);
server.use(notFoundErrHandler);

console.table(listEndpoints(server));

server.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Server is running on port :  ${PORT} and connected to DB`);
  } catch (error) { }
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
