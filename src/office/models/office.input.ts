import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class OfficeInput {

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