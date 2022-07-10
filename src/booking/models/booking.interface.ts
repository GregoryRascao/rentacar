import { ObjectId } from "mongoose";

export class Booking {
  _id: ObjectId;
  date: string;
  carId: string;
  officeId: string;
}