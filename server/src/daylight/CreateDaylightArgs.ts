import { ArgsType, Field } from "@nestjs/graphql";
import { DaylightCreateInput } from "./DaylightCreateInput";

@ArgsType()
class CreateDaylightArgs {
  @Field(() => DaylightCreateInput, { nullable: false })
  data!: DaylightCreateInput;
}

export { CreateDaylightArgs };
