import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };

const clientSchema = new Schema({
  role: notReqString,
  password: notReqString,
  firstname: notReqString,
  lastname: notReqString,
  username: notReqString,
  email: {
    type: String,
    lowercase: true,
    required: [true, "An email is required."],
    unique: [true, "An email is already registered."],
    match: [/.+\@.+\..+/, "Not a valid email"],
  },
  address: notReqString,
  fav_stores: notReqString,
  fav_products: notReqString,
  pref_location: notReqString,
  store_search_history: notReqString,
  shopping_list: notReqString,
  avatar: {
    ...notReqString,
    default: () => {
      return `https://eu.ui-avatars.com/api/?name=${firstname}+${lastname}?color=ff9900`;
    },
  },
  //  shopping_cart: notReqString
});

clientSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPW = newUser.password;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(plainPW, 10);
  }
  next();
});

clientSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;
  delete userObject.refreshToken;
  return userObject;
};

clientSchema.statics.checkCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};

export default model("Client", clientSchema);
