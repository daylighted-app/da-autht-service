import { ArgsType, Field } from "@nestjs/graphql";
import { DelightWhereUniqueInput } from "./DelightWhereUniqueInput";

@ArgsType()
class DeleteDelightArgs {
  @Field(() => DelightWhereUniqueInput, { nullable: false })
  where!: DelightWhereUniqueInput;
}

export { DeleteDelightArgs };
