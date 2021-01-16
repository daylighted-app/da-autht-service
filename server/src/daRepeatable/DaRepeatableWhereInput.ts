import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested, IsString } from "class-validator";
import { Type, Transform } from "class-transformer";
import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";
@InputType()
class DaRepeatableWhereInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date | null;
  @ApiProperty({
    required: false,
    type: DaylightWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => DaylightWhereUniqueInput)
  @IsOptional()
  daylight?: DaylightWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
}
export { DaRepeatableWhereInput };
