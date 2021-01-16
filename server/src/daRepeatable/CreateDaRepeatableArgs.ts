import { ArgsType, Field } from "@nestjs/graphql";
import { DaRepeatableCreateInput } from "./DaRepeatableCreateInput";

@ArgsType()
class CreateDaRepeatableArgs {
  @Field(() => DaRepeatableCreateInput, { nullable: false })
  data!: DaRepeatableCreateInput;
}

export { CreateDaRepeatableArgs };
