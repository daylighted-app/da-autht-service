import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class DaRepeatableCreateInput {
  @ApiProperty({
    required: true,
    type: DaylightWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaylightWhereUniqueInput)
  @Field(() => DaylightWhereUniqueInput)
  daylight!: DaylightWhereUniqueInput;
}
export { DaRepeatableCreateInput };
