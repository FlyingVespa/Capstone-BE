import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";
import corsConfig from "./settings/cors.js";
import usersRouter from "./services/users.router.js";
import clientsRouter from "./services/clients.router.js";
import loginRouter from "./services/login.router.js";
import registerRouter from "./services/register.router.js";
import productsRouter from "./services/products.router.js";

const { PORT, MONGODB_CONNECT } = process.env;
const server = express();

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

server.use(cors(corsConfig));
server.use(express.json());
server.use(cookieParser());
server.use(express.static("public"));
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

// * ENDPOINTS ****************************************************************//

server.use("/register", registerRouter);
server.use("/business", usersRouter);
server.use("/profile", clientsRouter);
server.use("/", productsRouter);
server.use("/auth", loginRouter);

// * ERROR MIDDLEWARES ******************************************************//
// server.use(unAuthorizedHandler);
// server.use(forbiddenErrHandler);
// server.use(serverErrHandler);
// server.use(badReqErrHandler);
// server.use(notFoundErrHandler);

console.table(listEndpoints(server));
