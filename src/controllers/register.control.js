// create a regsiter post with an if else statement
// get req.body.role if role === business { usersScheme new etc} else if role === " client" do ClientSchema.
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import createError from "http-errors";

export const registerAccount = async (req, res, next) => {
  try {
    if (req.body.role === "user") {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(400).json({
            email:
              "Email already registered to an USER account, continue to login",
            url: "Url Already taken, please choose a unique URL",
          });
        } else {
          const newUser = new User(req.body);
          const { _id } = newUser.save();
          return res.status(201).json({ msg: newUser });
        }
      });
    } else if (req.body.role === "client") {
      Client.findOne({ email: req.body.email }).then((client) => {
        if (client) {
          return res.status(400).json({
            email:
              "Email already registered to an CLIENT account, continue to login or choose new email",
          });
        } else {
          const newClient = new Client(req.body);
          const { _id } = newClient.save();
          return res.status(201).json({ msg: newClient });
        }
      });
    }
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
};
