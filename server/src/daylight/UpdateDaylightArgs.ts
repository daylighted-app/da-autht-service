import { ArgsType, Field } from "@nestjs/graphql";
import { DaylightWhereUniqueInput } from "./DaylightWhereUniqueInput";
import { DaylightUpdateInput } from "./DaylightUpdateInput";

@ArgsType()
class UpdateDaylightArgs {
  @Field(() => DaylightWhereUniqueInput, { nullable: false })
  where!: DaylightWhereUniqueInput;
  @Field(() => DaylightUpdateInput, { nullable: false })
  data!: DaylightUpdateInput;
}

export { UpdateDaylightArgs };
