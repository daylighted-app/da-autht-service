import { ArgsType, Field } from "@nestjs/graphql";
import { DelightWhereUniqueInput } from "./DelightWhereUniqueInput";

@ArgsType()
class FindOneDelightArgs {
  @Field(() => DelightWhereUniqueInput, { nullable: false })
  where!: DelightWhereUniqueInput;
}

export { FindOneDelightArgs };
