import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  basic: {
    name: { type: String, required: true },
    category: { type: String },
    email: { type: String },
    shipping: { type: Boolean },
    password: { type: String },
    username: { type: String },
    services: [String],
  },
  contact: {
    email: { type: String, required: false },
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
    street_numbebr: { type: String, required: false },
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
});

export default model("User", usersSchema);
