import { ArgsType, Field } from "@nestjs/graphql";
import { DaylightWhereUniqueInput } from "./DaylightWhereUniqueInput";

@ArgsType()
class DeleteDaylightArgs {
  @Field(() => DaylightWhereUniqueInput, { nullable: false })
  where!: DaylightWhereUniqueInput;
}

export { DeleteDaylightArgs };
