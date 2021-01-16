import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsString,
  ValidateNested,
  IsOptional,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";
import { DaRepeatableWhereUniqueInput } from "../daRepeatable/DaRepeatableWhereUniqueInput";
import { DaTimingWhereUniqueInput } from "../daTiming/DaTimingWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@ObjectType()
class Daylight {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: false,
    type: DaRepeatableWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaRepeatableWhereUniqueInput)
  @IsOptional()
  repeatition!: DaRepeatableWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  score!: number | null;
  @ApiProperty({
    required: false,
    type: DaTimingWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaTimingWhereUniqueInput)
  @IsOptional()
  timing!: DaTimingWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  userId!: UserWhereUniqueInput | null;
}
export { Daylight };
