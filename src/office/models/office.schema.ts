import mongoose from "mongoose";

export const officeSchema = new mongoose.Schema({
  name: String,
  country: String,
  address: String,
  city: String,
  carsId: [String]
})