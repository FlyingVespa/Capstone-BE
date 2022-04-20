import mongoose from "mongoose";

const { Schema, model } = mongoose;
const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };
const reqNumber = { type: Number, required: true };
const productSchema = new Schema(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: notReqString,
    price: reqNumber,
    units: notReqString,
    status: notReqString,
    sku: notReqString,
    brand: notReqString,
    description: notReqString,
    cloudinary_id: notReqString,
    image: {
      ...notReqString,
      default: () => {
        return `https://eu.ui-avatars.com/api/?name=product`;
      },
    },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const productDocument = this;
  const productObject = productDocument.toObject();
  delete productObject.__v;
  return productObject;
};

export default model("Product", productSchema, "products");
