import mongoose from "mongoose";

const { Schema, model } = mongoose;
const reqString = { type: String, required: true };
const notReqString = { type: String, required: false };
const productSchema = new Schema(
  {
    businessId: { type:  mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    product: {type: String, required: true},
    price: notReqString,
    desc: notReqString,
    units: notReqString,
    stocklevel: notReqString,
    cloudinary_id: notReqString,
    image: {
      ...notReqString,
      default: () => {
        return `https://eu.ui-avatars.com/api/?name=${product}`;
      },
    },
  },
  { timestamps: true }
);

productSchema.static("findProductByBusiness", async function (query) {
  const total = await this.countDocuments(query);
  const products = await this.find(query.criteria)
    .limit(query.options.limit)
    .skip(query.options.skip)
    .sort(query.options.sort)
    .populate({ path: "businessId", select: "_id" });
  return { total, products };
});

productSchema.methods.toJSON = function () {
  const productDocument = this;
  const productObject = productDocument.toObject();

  productObject.id = productObject._id;
  delete productObject._id;
  delete productObject.__v;
  return productObject;
};

export default model("Product", productSchema);
