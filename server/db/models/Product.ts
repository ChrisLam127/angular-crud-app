import mongoose from "mongoose";

export interface Product extends mongoose.Document {
  _id?: string;
  name: string;
  image: string;
  price: string;
  qty: string;
  info: string;
  created_at?: string;
  updated_at?: string;
}
