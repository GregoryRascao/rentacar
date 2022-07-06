import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CarInput {
  @Field(() => ID)
  id: string

  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => Int)
  officeId: number;

  @Field(() => String)
  color: string;

  @Field(() => String)
  imageUrl: string;
}