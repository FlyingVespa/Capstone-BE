// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const plainPW = "1234";

// console.time = "bcrypt";
// const hash = bcrypt.hashSync(plainPW, 10);
// console.log(hash);
// conslole.timeEnd("bcrypt");
// const isEqual = bcrypt.compareSync(plainPW, hash);
// console.log(isEqual);
// import jwt from "jsonwebtoken";

const token = jwt.sign(
  { _id: "616c9cfbecc7adbc5cc1c5d4" },
  "process.env.JWT_SECRET",
  { expiresIn: "1 week" }
);
const verified = jwt.verify(token, "process.env.JWT_SECRET");
console.log(token);
console.log(verified);
