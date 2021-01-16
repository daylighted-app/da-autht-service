import { ArgsType, Field } from "@nestjs/graphql";
import { DaFeelingWhereInput } from "./DaFeelingWhereInput";

@ArgsType()
class FindManyDaFeelingArgs {
  @Field(() => DaFeelingWhereInput, { nullable: true })
  where?: DaFeelingWhereInput;
}

export { FindManyDaFeelingArgs };
