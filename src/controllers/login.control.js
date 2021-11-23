import bcrypt from "bcrypt";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import { getTokens } from "../middlewares/login.middleware.js";

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
        await res.cookie("accessToken", accessToken);
        await res.cookie("refreshToken", refreshToken);
        res.status(200).send({ accessToken, refreshToken });
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
        await res.cookie("accessToken", accessToken);
        await res.cookie("refreshToken", refreshToken);
        res.status(200).send({ accessToken, refreshToken });
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

export const userLogout = (req, res) => {
  res.clearCookie("token");

  return res.redirect("/login");
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

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("context", { httpOnly: true });
    res.redirect(301, "/login");
  } catch (error) {
    next(error);
  }
};
