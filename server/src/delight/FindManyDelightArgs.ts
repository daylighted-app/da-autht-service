import { ArgsType, Field } from "@nestjs/graphql";
import { DelightWhereInput } from "./DelightWhereInput";

@ArgsType()
class FindManyDelightArgs {
  @Field(() => DelightWhereInput, { nullable: true })
  where?: DelightWhereInput;
}

export { FindManyDelightArgs };
