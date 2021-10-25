import express from "express";
import { nanoid } from "nanoid";
import createError from "http-errors";

// import userSchema from "./usersSchema.js";
import {
  basicAuthMiddleware,
  JWTAuthMiddleware,
} from "../../auth/middlewares.js";
import { adminOnly } from "../../auth/admin.js";
import { JWTAuthenticate, refreshTokens } from "../../auth/tools.js";
import User from "./usersSchema.js";

// 1. GET all
// 2. GET Single
// 3. POST Create Single
// 4. PUT Single
// 5. DELETE Single
// 6. REFRESH Token
// 7. LOGIN Single
// 8. LOUGOUT Single

const usersRouter = express.Router();

// 1. GET ALL **************************************************************************************/
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next();
  }
});

// 2. GET SINGLE with Auth **************************************************************************************/
usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    console.log(`INFO: [user=${req.user}]`);

    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
// 2. GET SINGLE with Auth **************************************************************************************/
usersRouter.get("/:userID", async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// 3. CREATE NEW USER **************************************************************************************/
usersRouter.post("/register", async (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({
          email: "Email already registered, continue to login",
        });
      } else {
        const newUser = new User(req.body);
        const { _id } = newUser.save();
        return res.status(201).json({ msg: newUser });
      }
    });
    // const newUser = new User(req.body);
    // const { _id } = await newUser.save();
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
});

// 4. UPDATE SINGLE **************************************************************************************/
usersRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    req.user.url = "Whatever";
    await req.user.save();

    console.log("BEFORE: ", res.headers);

    res.headers.add("Access-Control-Allow-Origin", "*");
    res.headers.add(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, OPTIONS, HEAD"
    );

    console.log("AFTER: ", res.headers);

    res.send();
  } catch (error) {
    next(error);
  }
});

// 5. DELETE SINGLE **************************************************************************************/
// usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
//   try {
//     await req.user.deleteOne();
//   } catch (error) {}
// });

// 6. REFRESH TOKEN **************************************************************************************/
usersRouter.post("/refreshToken", async (req, res, next) => {
  try {
    const { actualRefreshToken } = req.body;
    const { accessToken, refreshToken } = await refreshTokens(
      actualRefreshToken
    );
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

// 7. LOGIN SINGLE **************************************************************************************/
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.checkCredentials(email, password);
    if (user) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user);
      res.send({ accessToken, refreshToken });
    } else {
      next(createError(401, "Credentials not valid!"));
    }
  } catch (error) {
    next(error);
  }
});

// 8. LOUGOUT SINGLE **************************************************************************************/
usersRouter.post("/logout", JWTAuthMiddleware, async (req, res, next) => {
  try {
    // req.user.refreshToken = null;
    res.cookie("jwt", " ", "{maxAge:1}");
    // await req.user.save();
    res.redirect("/business");

    res.send();
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// usersRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
//   try {
//     req.user.name = "Whatever"; // modify req.user with the fields coming from req.body
//     await req.user.save();

//     res.send();
//   } catch (error) {
//     next(error);
//   }
// });

usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    await req.user.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
