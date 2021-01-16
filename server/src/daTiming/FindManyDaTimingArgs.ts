import { ArgsType, Field } from "@nestjs/graphql";
import { DaTimingWhereInput } from "./DaTimingWhereInput";

@ArgsType()
class FindManyDaTimingArgs {
  @Field(() => DaTimingWhereInput, { nullable: true })
  where?: DaTimingWhereInput;
}

export { FindManyDaTimingArgs };
