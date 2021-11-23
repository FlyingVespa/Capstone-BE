import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cookieParser from "cookie-parser";
// import corsConfig from "./settings/cors";
import helmet from "helmet";
import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";

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
const trustOrigins = [process.env.FRONTEND_PROD_URL];

const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || trustOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  credentials: true,
};

server.use(cors(corsConfig));

server.use(express.json());
server.use(helmet());
server.use(cookieParser());

// * ENDPOINTS ****************************************************************//

server.use("/register", registerRouter);
server.use("/business", usersRouter);
server.use("/profile", clientsRouter);
server.use("/business/:userId/products", productsRouter);
server.use("/auth", loginRouter);

// server.get("/", (req, res) => {
//   res.send("welcome to a simple HTTP cookie server");
// });
// server.get("/setcookie", (req, res) => {
//   res.cookie(`Cookie token name`, `encrypted cookie string Value`);
//   res.send("Cookie have been saved successfully");
// });

// * ERROR MIDDLEWARES ******************************************************//
server.use(unAuthorizedHandler);
server.use(forbiddenErrHandler);
server.use(serverErrHandler);
server.use(badReqErrHandler);
server.use(notFoundErrHandler);

console.table(listEndpoints(server));
