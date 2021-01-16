import { ArgsType, Field } from "@nestjs/graphql";
import { DelightWhereUniqueInput } from "./DelightWhereUniqueInput";
import { DelightUpdateInput } from "./DelightUpdateInput";

@ArgsType()
class UpdateDelightArgs {
  @Field(() => DelightWhereUniqueInput, { nullable: false })
  where!: DelightWhereUniqueInput;
  @Field(() => DelightUpdateInput, { nullable: false })
  data!: DelightUpdateInput;
}

export { UpdateDelightArgs };
