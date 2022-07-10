import { ObjectId } from "mongoose";

export class Car {
  _id: ObjectId;
  brand: string;
  model: string;
  color: string;
  imageUrl: string
}