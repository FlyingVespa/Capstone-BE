import bcrypt from "bcrypt";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import { getTokens } from "../middlewares/login.middleware.js";
import createError from "http-errors";

// LOGIN
// REFRESH
// LOGOUT

export const loginUser = async (req, res) => {
  const cookieAge = 48 * 60 * 60 * 1000;
  try {
    const client = await Client.findOne({ email: req.body.email });
    const user = await User.findOne({ email: req.body.email });
    if (client && !user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        client.password
      );
      if (validPassword) {
        const { accessToken, refreshToken } = await getTokens(client);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res
          .status(200)
          .send({ message: "Logged in successfully  as CLIENT😊 👌" });
      } else {
        res.status(400).json({ error: "Invalid Client Password" });
      }
    } else if (user && !client) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const { accessToken, refreshToken } = await getTokens(user);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .send({ message: "Logged in successfully as USER😊 👌" });
      } else {
        res.status(400).json({ error: "Invalid Client Password" });
      }
    } else if (!user && !client) {
      res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

export const userLogout = async (req, res, next) => {
  const user = req.user;
  try {
    await user.updateOne({ refreshToken: "" });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (error) {
    next(createError(500));
  }
};

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return next(createError(400, "Refresh token must be provided"));
  try {
    const tokens = await refreshTokens(refreshToken);
    if (!tokens) return next(createError(401, "Invalid token"));
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
    });
    res.status(204).send();
  } catch (error) {
    next(createError(500, error));
  }
};

export const logout = async (req, res, next) => {};
