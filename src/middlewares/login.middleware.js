import jwt from "jsonwebtoken";
import User from "../schema/user.schema.js";
import Client from "../schema/client.schema.js";
import createError from "http-errors";
const EXPIRE_10_MINUTES = "1000000";

export const getTokens = async (user) => {
  const accessToken = await generateJWT({ _id: user._id });
  const refreshToken = await generateRefreshJWT({ _id: user._id });
  user.refreshToken = refreshToken;
  user.save();
  return { accessToken, refreshToken };
};

const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1w" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );

const generateRefreshJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "2w" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );
export const verifyJWT = (token) => {
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      console.log(err, decodedToken);
      if (err) reject(err);
      resolve(decodedToken);
    })
  );
};
const verifyRefreshJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => {
      if (err) reject(err);
      resolve(decodedToken);
    })
  );

export const refreshTokens = async (actualRefreshToken) => {
  try {
    const decoded = await verifyRefreshJWT(actualRefreshToken);
    const user = await User.findById(decoded._id);
    const client = await Client.findById(decoded._id);
    if (!user && !client) throw new Error("User not found");
    if (actualRefreshToken === user.refreshToken) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user);
      return { accessToken, refreshToken };
    } else if (actualRefreshToken === client.refreshToken) {
      const { accessToken, refreshToken } = await JWTAuthenticate(client);
      return { accessToken, refreshToken };
    }
  } catch (error) {
    throw new Error("Token not valid!");
  }
};

export const loginMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const { decodedToken } = await verifyJWT(token);
    const client = await Client.findById(decodedToken._id);
    req.user = client;
    next();
  } catch (error) {
    next(createError(401, "Invalid token"));
  }
};

// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let client = await Client.findById(decodedToken._id);
//         let user = await User.findById(decodedToken._id);

//         if (client && !user) {
//           res.locals.user = client;
//           next();
//         }
//         if (user && !client) {
//           res.locals.user = user;
//           next();
//         }
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

export const verifyRole = async (req, res, next) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    const user = await User.findOne({ email: req.body.email });
    if (user && !client) {
      res.status(200).send(user);
    } else if (client && !user) {
      res.status(200).send(client);
    } else if (!user && !client) {
      res.status(400).send("email does not exist");
    }
  } catch (error) {
    next(error);
  }
};
