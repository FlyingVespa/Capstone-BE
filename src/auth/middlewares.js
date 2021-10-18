import createError from "http-errors";
import atob from "atob";

import userSchema from "../services/usersRouter/usersSchema.js";
import { verifyJWT } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
  // 1. Check if Authorization header is received, if it is not --> trigger an error (401)
  console.log(req.headers);
  if (!req.headers.authorization) {
    next(
      createError(
        401,
        "Please provide credentials in the Authorization header!"
      )
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken = await verifyJWT(token);
      const user = await userSchema.findById(decodedToken._id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(createError(404, "User not found!"));
      }
    } catch (error) {
      next(createError(401, "Token Expired!"));
    }
  }
};

export const basicAuthMiddleware = async (req, res, next) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    next(
      createError(
        401,
        "Please provide credentials in the Authorization header!"
      )
    );
  } else {
    const decoded = atob(req.headers.authorization.split(" ")[1]);
    console.log(decoded);

    const [email, password] = decoded.split(":");

    const user = await userSchema.checkCredentials(email, password);
    if (user) {
      next();
    } else {
      next(createError(401, "Credentials are not correct!"));
    }
  }
};
