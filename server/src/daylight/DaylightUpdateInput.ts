import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DaRepeatableWhereUniqueInput } from "../daRepeatable/DaRepeatableWhereUniqueInput";
import { ValidateNested, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { DaTimingWhereUniqueInput } from "../daTiming/DaTimingWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class DaylightUpdateInput {
  @ApiProperty({
    required: false,
    type: DaRepeatableWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaRepeatableWhereUniqueInput)
  @IsOptional()
  @Field(() => DaRepeatableWhereUniqueInput, {
    nullable: true,
  })
  repeatition?: DaRepeatableWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  score?: number | null;
  @ApiProperty({
    required: false,
    type: DaTimingWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaTimingWhereUniqueInput)
  @IsOptional()
  @Field(() => DaTimingWhereUniqueInput, {
    nullable: true,
  })
  timing?: DaTimingWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  userId?: UserWhereUniqueInput | null;
}
export { DaylightUpdateInput };
