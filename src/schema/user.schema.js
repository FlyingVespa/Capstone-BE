import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };
const reqBoolean = { type: Boolean };
const number = { type: Number };

const userSchema = new Schema(
  {
    role: notReqString,
    password: reqString,
    businessname: reqString,
    category: notReqString,
    username: reqString,
    url: { type: String, required: true, unique: true },
    email: {
      type: String,
      lowercase: true,
      required: [true, "An email is required."],
      unique: [true, "An email is already registered."],
      match: [/.+\@.+\..+/, "Not a valid email"],
      // validate: [isEmail, "Please enter valid email"],
    },

    address: {
      lat: notReqString,
      lng: notReqString,
      street_number: notReqString,
      street_name: notReqString,
      city: notReqString,
      state: notReqString,
      country: notReqString,
    },
    coords: {
      lat: notReqString,
      lng: notReqString,
    },
    contact: {
      pub_email: notReqString,
      tel: notReqString,
      cell: reqString,
      insta: notReqString,
      whatsapp: notReqString,
      twitter: notReqString,
    },

    times: [
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
      {
        day: number,
        trading: reqBoolean,
        open: notReqString,
        closed: notReqString,
      },
    ],
    services: [String],
    bio: notReqString,
    shipping: reqBoolean,
    img_logo: {
      ...notReqString,
      default: () => {
        return `https://eu.ui-avatars.com/api/?name=Test`;
      },
    },
    img_banner: {
      ...notReqString,
      default: () => {
        return `https://www.placecage.com/1800/400`;
      },
    },

    img_user: {
      ...notReqString,
      default: () => {
        return ` https://www.stevensegallery.com/200/300`;
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
