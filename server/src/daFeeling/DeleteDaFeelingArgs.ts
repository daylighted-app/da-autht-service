import { ArgsType, Field } from "@nestjs/graphql";
import { DaFeelingWhereUniqueInput } from "./DaFeelingWhereUniqueInput";

@ArgsType()
class DeleteDaFeelingArgs {
  @Field(() => DaFeelingWhereUniqueInput, { nullable: false })
  where!: DaFeelingWhereUniqueInput;
}

export { DeleteDaFeelingArgs };
