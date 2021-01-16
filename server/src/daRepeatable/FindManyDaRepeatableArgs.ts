import { ArgsType, Field } from "@nestjs/graphql";
import { DaRepeatableWhereInput } from "./DaRepeatableWhereInput";

@ArgsType()
class FindManyDaRepeatableArgs {
  @Field(() => DaRepeatableWhereInput, { nullable: true })
  where?: DaRepeatableWhereInput;
}

export { FindManyDaRepeatableArgs };
