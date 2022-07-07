import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CarInput {

  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  imageUrl: string;
}