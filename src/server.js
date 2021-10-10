import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

const server = express();

server.use(cors());
server.use(express.json());
console.log(listEndpoints(server));

import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";

import usersRouter from "./services/usersRouter/usersRouter.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const publicDirectory = path.join(__dirname, "../public");

const { PORT, MONGODB_CONNECT } = process.env;

// const whiteList = ["http://localhost:4444"];

server.use(cors());
server.use(express.json());

// * ENDPOINTS ****************************************************************//
// server.use("/");
server.use("/business", usersRouter);

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
  } catch (error) {}
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);

// mongoose.connect(process.env.MONGODB_CONNECT);

// mongoose.connection.on("connected", () => {
//   console.log("Successfully connected to Mongo!");
//   server.listen(PORT, () => {
//     console.table(listEndpoints(server));
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });
