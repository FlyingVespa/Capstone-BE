// import {  } from "../middlewares/login.middleware.js";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import createError from "http-errors";

export const registerAccount = async (req, res, next) => {
  try {
    if (req.body.role === "user") {
      const newUser = await new User(req.body);
      const user = await newUser.save({ new: true });

      return res.status(201).send(user);
    } else if (req.body.role === "client") {
      const newClient = await new Client(req.body);
      const client = await newClient.save({ new: true });

      return res.status(201).send(client);
    }
    return res.status(422).send({ error: "role not defined" });
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
};
