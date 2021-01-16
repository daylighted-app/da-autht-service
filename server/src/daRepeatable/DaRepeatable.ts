import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";
@ObjectType()
class DaRepeatable {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date | null;
  @ApiProperty({
    required: true,
    type: DaylightWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DaylightWhereUniqueInput)
  daylight!: DaylightWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
}
export { DaRepeatable };
