import { JWTAuthenticate } from "../middlewares/login.middleware.js";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import createError from "http-errors";

const cookieAge = 48 * 60 * 60 * 1000;

export const registerAccount = async (req, res, next) => {
  try {
    if (req.body.role === "user") {
      const newUser = await new User(req.body);
      const user = await newUser.save({ new: true });
      const authToken = await JWTAuthenticate(user);
      res.cookie("token", authToken, {
        httpOnly: true,
        maxAge: cookieAge,
      });
      return res.status(201).send(authToken);
      // }
      // });
    } else if (req.body.role === "client") {
      const newClient = await new Client(req.body);
      const client = await newClient.save({ new: true });
      const authToken = await JWTAuthenticate(client);
      res.cookie("token", authToken, {
        httpOnly: true,
        maxAge: cookieAge,
      });
      return res.status(201).send(authToken);
      // }
      // });
    }
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
};
