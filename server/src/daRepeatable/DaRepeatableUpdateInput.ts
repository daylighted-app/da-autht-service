import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class DaRepeatableUpdateInput {
  @ApiProperty({
    required: false,
    type: DaylightWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaylightWhereUniqueInput)
  @IsOptional()
  @Field(() => DaylightWhereUniqueInput, {
    nullable: true,
  })
  daylight?: DaylightWhereUniqueInput;
}
export { DaRepeatableUpdateInput };
