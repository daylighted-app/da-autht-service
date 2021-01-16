import { ArgsType, Field } from "@nestjs/graphql";
import { DaFeelingWhereUniqueInput } from "./DaFeelingWhereUniqueInput";

@ArgsType()
class FindOneDaFeelingArgs {
  @Field(() => DaFeelingWhereUniqueInput, { nullable: false })
  where!: DaFeelingWhereUniqueInput;
}

export { FindOneDaFeelingArgs };
