import { ArgsType, Field } from "@nestjs/graphql";
import { DaDepictionWhereInput } from "./DaDepictionWhereInput";

@ArgsType()
class FindManyDaDepictionArgs {
  @Field(() => DaDepictionWhereInput, { nullable: true })
  where?: DaDepictionWhereInput;
}

export { FindManyDaDepictionArgs };
