import { ArgsType, Field } from "@nestjs/graphql";
import { DaylightWhereUniqueInput } from "./DaylightWhereUniqueInput";

@ArgsType()
class FindOneDaylightArgs {
  @Field(() => DaylightWhereUniqueInput, { nullable: false })
  where!: DaylightWhereUniqueInput;
}

export { FindOneDaylightArgs };
