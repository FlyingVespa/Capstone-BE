import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String, required: true },
  basic: {
    name: { type: String, required: true },
    category: { type: String, required: false },
    username: { type: String, required: true },
  },
  contact: {
    emails: { type: String, required: false },
    tel: { type: String, required: false },
    cell: { type: String, required: true },
    insta: { type: String, required: false },
    whatsapp: { type: String, required: false },
    twitter: { type: String, required: false },
  },
  location: {
    country: { type: String, required: false },
    region: { type: String, required: false },
    city: { type: String, required: false },
    zip: { type: String, required: false },
    street: { type: String, required: false },
    street_no: { type: Number, required: false },
  },

  times: {
    monday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    tuesday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    wednesday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    thursday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    friday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    saturday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    sunday: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
    public: {
      trading: { type: Boolean },
      open: { type: String },
      closed: { type: String },
    },
  },
  info: {
    services: [String],
    bio: { type: String },
    shipping: { type: Boolean, required: false },
    img_logo: { type: String, default: "placeholder.jpg" },
    img_banner: { type: String, default: "placeholder.jpg" },
    img_user: { type: String, default: "placeholder.jpg" },
  },
});

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

  return userObject;
};

userSchema.statics.checkCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);

    if (isMatch) return user;
    else return null;
  } else {
    next();
  }
};

export default model("User", userSchema);
