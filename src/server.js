import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

<<<<<<< Updated upstream
import authorsRouter from "./authors/index.js";

const server = express();

const PORT = 3001;

server.use(cors());

server.use(express.json());

server.use("/authors", authorsRouter);

console.log(listEndpoints(server));
=======
import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "./errorHandlers.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

const server = express();

const { PORT, MONGODB_CONNECT } = process.env;

const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static(publicDirectory));

//
// * ENDPOINTS ****************************************************************//
server.use("/register", registerRouter);

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
>>>>>>> Stashed changes

    console.log(`✅ Server is running on port :  ${PORT} and connected to DB`);
  } catch (error) {}
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);

// mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
//   console.log("SUCCESS: connected to MONGODB");
//   server.listen(PORT, () => {
//     listEndpoints(app);
//     console.log("SERVER listening on: " + PORT);
//   });
// });
