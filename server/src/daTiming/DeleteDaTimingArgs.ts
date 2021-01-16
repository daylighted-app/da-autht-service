import { ArgsType, Field } from "@nestjs/graphql";
import { DaTimingWhereUniqueInput } from "./DaTimingWhereUniqueInput";

@ArgsType()
class DeleteDaTimingArgs {
  @Field(() => DaTimingWhereUniqueInput, { nullable: false })
  where!: DaTimingWhereUniqueInput;
}

export { DeleteDaTimingArgs };
