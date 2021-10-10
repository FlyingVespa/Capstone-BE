import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  regForm: {
    basic: {
      name: { type: String, required: true },
      category: { type: String, required: true },
      email: { type: String, required: true },
      delivery: { type: Boolean, required: true },
      password: { type: String, required: true },
      username: { type: String, required: true },
    },
    contact: {
      email: { type: String, required: false },
      tel: { type: String, required: false },
      cell: { type: String, required: true },
      insta: { type: String, required: false },
      whatsapp: { type: String, required: false },
      twitter: { type: String, required: false },
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
    timestamps: true,
  },
});

export default model("User", userSchema);
