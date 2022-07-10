import { Field, ID, ObjectType} from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class BookingType {

  @Field(() => ID)
  _id: ObjectId

  @Field(() => String)
  name: string;

  @Field(() => String)
  carId: string;

  @Field(() => String)
  officeId: string;

  @Field(() => String)
  date: string;

}