import * as mongoose from "mongoose";

export const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  color: String,
  imageUrl: String
})