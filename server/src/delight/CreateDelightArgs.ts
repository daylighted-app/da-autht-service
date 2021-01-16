import { ArgsType, Field } from "@nestjs/graphql";
import { DelightCreateInput } from "./DelightCreateInput";

@ArgsType()
class CreateDelightArgs {
  @Field(() => DelightCreateInput, { nullable: false })
  data!: DelightCreateInput;
}

export { CreateDelightArgs };
