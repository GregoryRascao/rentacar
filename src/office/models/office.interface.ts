import { ObjectId } from "mongoose";

export class Office {
  _id: ObjectId;
  name: string;
  country: string;
  address: string;
  city: string;
  carsId: [string]
}