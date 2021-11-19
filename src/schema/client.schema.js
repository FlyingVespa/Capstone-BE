import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };

const clientSchema = new Schema(
  {
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
        return `https://eu.ui-avatars.com/api/?name=test`;
      },
    },
    //  shopping_cart: notReqString
  },
  { timestamps: true }
);

clientSchema.pre(
  "save",
  async function (next) {
    // const salt = genSalt(10);
    const newClient = this;
    const plainPW = newClient.password;
    if (newClient.isModified("password")) {
      newClient.password = await bcrypt.hash(plainPW, 10);
    }
    next();
  },
  { timestamps: true }
);

clientSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;
  delete userObject.refreshToken;
  return userObject;
};

export default model("Client", clientSchema);
