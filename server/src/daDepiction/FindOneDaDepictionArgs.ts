import { ArgsType, Field } from "@nestjs/graphql";
import { DaDepictionWhereUniqueInput } from "./DaDepictionWhereUniqueInput";

@ArgsType()
class FindOneDaDepictionArgs {
  @Field(() => DaDepictionWhereUniqueInput, { nullable: false })
  where!: DaDepictionWhereUniqueInput;
}

export { FindOneDaDepictionArgs };
