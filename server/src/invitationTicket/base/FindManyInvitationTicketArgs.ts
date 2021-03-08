import { ArgsType, Field } from "@nestjs/graphql";
import { InvitationTicketWhereInput } from "./InvitationTicketWhereInput";

@ArgsType()
class FindManyInvitationTicketArgs {
  @Field(() => InvitationTicketWhereInput, { nullable: true })
  where?: InvitationTicketWhereInput;
}

export { FindManyInvitationTicketArgs };
