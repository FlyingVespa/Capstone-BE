import jwt from "jsonwebtoken";
import userSchema from "../services/users/usersSchema.js";
import clientsSchema from "../services/customers/clientsSchema.js";

//1. JWT
//2. CHECK USER & CLIENT COLLECTIONS EMAIL EXISTS
//3. VERIFY TYPE OF USER

const EXPIRE_10_MINUTES = "900000";

export const JWTAuthenticate = async (user) => {
  const accessToken = await generateJWT({ _id: user._id });
  const refreshToken = await generateRefreshJWT({ _id: user._id });
  user.refreshToken = refreshToken;
  await user.save(function () {});
  return { accessToken, refreshToken };
};

const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: EXPIRE_10_MINUTES },
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
      { expiresIn: EXPIRE_10_MINUTES },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );

export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err);
      resolve(decodedToken);
    })
  );

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
    const user = await userSchema.findById(decoded._id);
    if (!user) throw new Error("User not found");
    if (actualRefreshToken === user.refreshToken) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user);
      return { accessToken, refreshToken };
    } else {
    }
  } catch (error) {
    throw new Error("Token not valid!");
  }
};
// ================================================================== //
//2. CHECK USER & CLIENT COLLECTIONS EMAIL EXISTS

export const isBusiness = async (req, res, next) => {
  try {
    let business = await userSchema.findOne({ email: req.body.email });
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
    let client = await clientsSchema.findOne({ email: req.body.email });
    if (!client) {
      next();
    } else {
      res.status(400).send("User with this email already exists");
    }
  } catch (error) {
    next(error);
  }
};
//  ================================================================= //
// 3. VERIFY TYPE OF USER

export const VerifyUserType = async (req, res, next) => {
    try {
      let verifyEmail = await userSchema.findOne({ email: req.body.email });
        if (verifyEmail) {
        req.body.role = 'business';
        next();
      } else {
        verifyEmail = await clientsSchema.findOne({ email: req.body.email });
        if (verifyEmail && !null) {
          req.body.role = 'client';
          next();
        } else {
          res.status(400).send('Credentials entered are incorrect or not found');
        }
      }
    } catch (error) {
      next(error);
    }
  };
  
 
