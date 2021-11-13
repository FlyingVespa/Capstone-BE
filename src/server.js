import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import bodyParser from "body-parser";
import dotenv from "dotenv"

import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";

import usersRouter from "./services/users/users.js";
import clientsRouter from "./services/customers/clients.js";
import loginRouter from "./services/login/login.js";
import registerRouter from "./services/register/register.js";




const { PORT, MONGODB_CONNECT } = process.env;
const server = express();


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


server.use(cors());

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// * ENDPOINTS ****************************************************************//
server.use("/register", registerRouter)
server.use("/business", usersRouter);
server.use("/profile", clientsRouter);
server.use("/login", loginRouter);

;

// * ERROR MIDDLEWARES ******************************************************//
server.use(unAuthorizedHandler);
server.use(forbiddenErrHandler);
server.use(serverErrHandler);
server.use(badReqErrHandler);
server.use(notFoundErrHandler);

console.table(listEndpoints(server));
