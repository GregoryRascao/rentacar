import { Field, ID, ObjectType} from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class OfficeType {

  @Field(() => ID)
  _id: ObjectId

  @Field(() => String)
  name: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;
  
  @Field(() => [String])
  carsId: [string];
}