import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import Client from "../schema/client.schema.js";
import User from "../schema/user.schema.js";

export const loginUser = async (req, res) => {
  let { email, password, role } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (req.body.role === "client") {
      let client = await Client.findOne({ email: email });
      const isMatch = await bcrypt.compare(password, client.password);
      if (isMatch) {
        const payload = {
          userInfo: {
            id: client._id,
            type: role,
          },
        };
        JWT.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 900000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        res.status(401).send("Password Incorrect");
      }
    } else if (role === "business") {
      let user = await User.findOne({ email: email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          userInfo: {
            id: user._id,
            type: role,
          },
        };
        JWT.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 900000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        res.status(401).send("Password Incorrect");
      }
    } else {
      res.status(400).send("No User not found");
    }
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server Error");
  }
};
