import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  basic: {
    name: { type: String, required: false },
    category: { type: String, required: false },
    email: { type: String, required: false },
    // pattern:{ value: /^[a-z0-9._%+-]+\.[a-z]{2,4}$/,
    // message:"Please enter valid email"}
    shipping: { type: Boolean, required: false },
    password: { type: String, required: false },
    username: { type: String, required: false },
    url: {
      type: String,
    },
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
    img_logo: { type: String, default: "placeholder.jpg" },
    img_banner: { type: String, default: "placeholder.jpg" },
    img_user: { type: String, default: "placeholder.jpg" },
  },
});

// usersSchema.pre("validate", function (next) {
//   if (this.description) {
//     this.description = htmlPurify.sanitize(this.description);
//     this.snippet = stripHtml(this.description.substring(0, 200)).result;
//   }
//   next();
// });

export default model("User", usersSchema);
