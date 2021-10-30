import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  product: { item: { String, unique: true }, price: { String } },
});
export default model("Product", productSchema);
