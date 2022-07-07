import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class CarType {

  @Field(() => ID)
  _id: ObjectId

  @Field(() => String)
  brand: string;
  
  @Field(() => String)
  model: string;
  
  @Field(() => String)
  color: string;

  @Field(() => String)
  imageUrl: string;
}