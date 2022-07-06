import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CarType {

  @Field(()=> ID)
  id: string

  @Field(() => String)
  brand: string;
  
  @Field(() => String)
  model: string;

  @Field(()=> Int)
  officeId: number
  
  @Field(() => String)
  color: string;

  @Field(() => String)
  imageUrl: string;
}