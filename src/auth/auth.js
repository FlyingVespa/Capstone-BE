import createError from "http-errors";

import atob from "atob";
import userSchema from "../services/usersRouter/usersSchema.js";

export const basicAuthMiddleware = async (REQ, RES, NEXT) => {
  console.log(REQ.headers);
  if (!REQ.headers.authorization) {
    NEXT(createError(401, " Please provide credentials"));

    const decoded = atob(REQ.headers.authorization.split(" ")[1]);
    console.log(decoded);

    const [email, password] = decoded.split(":");
    const user = await userSchema.checkcredentials(email, password);
    if (user) {
      REQ.user = user;
      NEXT();
    } else {
      NEXT(createError(401, "Credentials are not correct"));
    }
  }
};
