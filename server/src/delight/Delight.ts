import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsEnum, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { EnumIs } from "./EnumIs";
@ObjectType()
class Delight {
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
    enum: EnumIs,
    isArray: true,
  })
  @IsEnum(EnumIs, {
    each: true,
  })
  @IsOptional()
  @Field(() => [EnumIs], {
    nullable: true,
  })
  is!: Array<"Repeatable" | "Timable" | "Evaluatable" | "Schedulable">;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Delight };
