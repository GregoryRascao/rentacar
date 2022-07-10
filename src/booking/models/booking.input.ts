import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class BookingInput {

  @Field(() => String)
  name: string;

  @Field(() => String)
  carId: string;

  @Field(() => String)
  officeId: string;

  @Field(() => String)
  date: string;

}