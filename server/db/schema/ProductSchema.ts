import mongoose from "mongoose";
import { Product } from "../models/Product";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    qty: { type: String, required: true },
    info: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductTable: mongoose.Model<Product> = mongoose.model(
  "product",
  ProductSchema
);

export default ProductTable;
