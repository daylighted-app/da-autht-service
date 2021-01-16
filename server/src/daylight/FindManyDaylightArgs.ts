import { ArgsType, Field } from "@nestjs/graphql";
import { DaylightWhereInput } from "./DaylightWhereInput";

@ArgsType()
class FindManyDaylightArgs {
  @Field(() => DaylightWhereInput, { nullable: true })
  where?: DaylightWhereInput;
}

export { FindManyDaylightArgs };
