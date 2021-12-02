import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };

const imageSchema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  cloudImage: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
  },
  post_date: {
    type: Date,
    default: Date.now,
  },
});

imageSchema.methods.toJSON = function () {
  const productDocument = this;
  const productObject = productDocument.toObject();

  delete productObject.__v;
  return productObject;
};

export default model("Image", imageSchema);
