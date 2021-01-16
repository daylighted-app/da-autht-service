import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
@InputType()
class UserCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  password!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  phone!: string;
  @ApiProperty({
    required: true,
    type: [String],
  })
  @IsString({
    each: true,
  })
  @Field(() => [String])
  roles!: Array<string>;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  username!: string;
}
export { UserCreateInput };
