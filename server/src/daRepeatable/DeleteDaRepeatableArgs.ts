import { ArgsType, Field } from "@nestjs/graphql";
import { DaRepeatableWhereUniqueInput } from "./DaRepeatableWhereUniqueInput";

@ArgsType()
class DeleteDaRepeatableArgs {
  @Field(() => DaRepeatableWhereUniqueInput, { nullable: false })
  where!: DaRepeatableWhereUniqueInput;
}

export { DeleteDaRepeatableArgs };
