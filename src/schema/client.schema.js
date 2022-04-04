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
    location: {
      lat: notReqString,
      lon: notReqString,
      street_number: notReqString,
      street_name: notReqString,
      city: notReqString,
      state: notReqString,
      country: notReqString,
    },
    fav_stores: { type: Schema.Types.ObjectId, ref: "User" },
    fav_products: { type: Schema.Types.ObjectId, ref: "Product" },
    pref_location: notReqString,
    store_search_history: notReqString,
    shopping_list: notReqString,
    avatar: {
      ...notReqString,
      default: () => {
        return `https://eu.ui-avatars.com/api/?name=test`;
      },
    },
  },
  { timestamps: true }
);

clientSchema.pre(
  "save",
  async function (next) {
    const salt = await bcrypt.genSalt();
    const newClient = this;
    const plainPW = newClient.password;
    if (newClient.isModified("password")) {
      newClient.password = await bcrypt.hash(plainPW, salt);
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
