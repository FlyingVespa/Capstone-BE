import mongoose from "mongoose";

const { Schema, model } = mongoose;
const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };
const productSchema = new Schema(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: notReqString,
    price: notReqString,
    units: notReqString,
    status: notReqString,
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

export default model("Product", productSchema);
