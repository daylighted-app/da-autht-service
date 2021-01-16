import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumIs } from "./EnumIs";
import { IsEnum, IsOptional } from "class-validator";
@InputType()
class DelightCreateInput {
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
  is?: Array<"Repeatable" | "Timable" | "Evaluatable" | "Schedulable">;
}
export { DelightCreateInput };
