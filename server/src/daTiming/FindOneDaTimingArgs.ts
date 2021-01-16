import { ArgsType, Field } from "@nestjs/graphql";
import { DaTimingWhereUniqueInput } from "./DaTimingWhereUniqueInput";

@ArgsType()
class FindOneDaTimingArgs {
  @Field(() => DaTimingWhereUniqueInput, { nullable: false })
  where!: DaTimingWhereUniqueInput;
}

export { FindOneDaTimingArgs };
