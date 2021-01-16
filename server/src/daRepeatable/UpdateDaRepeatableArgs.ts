import { ArgsType, Field } from "@nestjs/graphql";
import { DaRepeatableWhereUniqueInput } from "./DaRepeatableWhereUniqueInput";
import { DaRepeatableUpdateInput } from "./DaRepeatableUpdateInput";

@ArgsType()
class UpdateDaRepeatableArgs {
  @Field(() => DaRepeatableWhereUniqueInput, { nullable: false })
  where!: DaRepeatableWhereUniqueInput;
  @Field(() => DaRepeatableUpdateInput, { nullable: false })
  data!: DaRepeatableUpdateInput;
}

export { UpdateDaRepeatableArgs };
