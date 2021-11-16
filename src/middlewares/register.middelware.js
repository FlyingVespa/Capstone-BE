import User from "../schema/user.schema.js";
import Client from "../schema/client.schema.js";

//1. CHECK USER & CLIENT COLLECTIONS EMAIL EXISTS

export const isBusiness = async (req, res, next) => {
  try {
    let business = await User.findOne({ email: req.body.email });
    if (!business) {
      next();
    } else {
      res.status(400).send("This email is linked with a Business account");
    }
  } catch (error) {
    next(error);
  }
};

export const isClient = async (req, res, next) => {
  try {
    let client = await Client.findOne({ email: req.body.email });
    if (!client) {
      next();
    } else {
      res.status(400).send("User with this email already exists");
    }
  } catch (error) {
    next(error);
  }
};
