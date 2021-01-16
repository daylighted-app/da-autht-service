import { ArgsType, Field } from "@nestjs/graphql";
import { DaRepeatableWhereUniqueInput } from "./DaRepeatableWhereUniqueInput";

@ArgsType()
class FindOneDaRepeatableArgs {
  @Field(() => DaRepeatableWhereUniqueInput, { nullable: false })
  where!: DaRepeatableWhereUniqueInput;
}

export { FindOneDaRepeatableArgs };
