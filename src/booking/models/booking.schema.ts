import mongoose from "mongoose";

export const BookingSchema = new mongoose.Schema({
  ReservationName: String,
  date: String,
  carId: String,
  officeId: String
})