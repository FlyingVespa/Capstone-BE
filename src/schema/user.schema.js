import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };
const reqBoolean = { type: Boolean };

const userSchema = new Schema(
  {
    role: notReqString,
    email: {
      type: String,
      lowercase: true,
      required: [true, "An email is required."],
      unique: [true, "An email is already registered."],
      match: [/.+\@.+\..+/, "Not a valid email"],
      // validate: [isEmail, "Please enter valid email"],
    },
    password: reqString,
    url: notReqString,
    businessname: reqString,
    category: notReqString,
    username: notReqString,
    address: {
      lat: notReqString,
      lng: notReqString,
      street_number: notReqString,
      street_name: notReqString,
      city: notReqString,
      state: notReqString,
      country: notReqString,
    },
    companydetails: {
      bio: notReqString,
      mobile: notReqString,
      public_email: notReqString,
      store_services: { type: Array },
      shipping: notReqString,
    },
    tradingtimes: [
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: notReqString,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
    ],

    img_logo: {
      ...notReqString,
      default: () => {
        return `https://eu.ui-avatars.com/api/?name=Test`;
      },
    },

    products: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPW = newUser.password;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(plainPW, 10);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;
  delete userObject.refreshToken;
  return userObject;
};

export default model("User", userSchema);
