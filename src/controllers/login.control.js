import bcrypt from "bcrypt";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";
import { JWTAuthenticate } from "../middlewares/login.middleware.js";

export const loginUser = async (req, res) => {
  const EXP_TIME = "1d";
  try {
    // if (req.body.role === "client") {
    const client = await Client.findOne({ email: req.body.email });
    const user = await User.findOne({ email: req.body.email });
    if (client && !user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        client.password
      );
      if (validPassword) {
        const token = JWTAuthenticate(client);
        res.cookie("Token", token);
        res.status(200).send(token);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else if (user && !client) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = JWTAuthenticate(user);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.status(200).send(token);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else if (!user && !client) {
      res.status(401).json({ error: "User does not exist" });
    }

    //     JWT.sign(
    //       payload,
    //       process.env.JWT_SECRET,
    //       {
    //         expiresIn: EXP_TIME,
    //       },
    //       (err, token) => {
    //         if (err) throw err;
    //         res.json({ token });
    //       }
    //     );
    //   } else {
    //     res.status(401).send("Password Incorrect");
    //   }
    // } else if (role === "business") {
    //   let user = await User.findOne({ email: email });
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (isMatch) {
    //     const payload = {
    //       userInfo: {
    //         id: user._id,
    //         type: role,
    //       },
    //     };
    //     JWT.sign(
    //       payload,
    //       process.env.JWT_SECRET,
    //       {
    //         expiresIn: EXP_TIME,
    //       },
    //       (err, token) => {
    //         if (err) throw err;
    //         res.json({ token });
    //       }
    //     );
    //   } else {
    //     res.status(401).send("Password Incorrect");
    //   }
    // } else {
    //   res.status(400).send("No User not found");
    // }
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server Error");
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("jwt");

  return res.redirect("/login");
};
