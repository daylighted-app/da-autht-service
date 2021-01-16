import { ArgsType, Field } from "@nestjs/graphql";
import { DaDepictionWhereUniqueInput } from "./DaDepictionWhereUniqueInput";

@ArgsType()
class DeleteDaDepictionArgs {
  @Field(() => DaDepictionWhereUniqueInput, { nullable: false })
  where!: DaDepictionWhereUniqueInput;
}

export { DeleteDaDepictionArgs };
