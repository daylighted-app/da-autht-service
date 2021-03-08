import { ArgsType, Field } from "@nestjs/graphql";
import { InvitationTicketWhereUniqueInput } from "./InvitationTicketWhereUniqueInput";

@ArgsType()
class DeleteInvitationTicketArgs {
  @Field(() => InvitationTicketWhereUniqueInput, { nullable: false })
  where!: InvitationTicketWhereUniqueInput;
}

export { DeleteInvitationTicketArgs };
