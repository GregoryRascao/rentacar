import * as mongoose from "mongoose";

export const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  officeId: Number,
  color: String,
  imageUrl: String
})