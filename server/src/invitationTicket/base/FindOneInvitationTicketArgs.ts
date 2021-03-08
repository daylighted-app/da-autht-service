import { ArgsType, Field } from "@nestjs/graphql";
import { InvitationTicketWhereUniqueInput } from "./InvitationTicketWhereUniqueInput";

@ArgsType()
class FindOneInvitationTicketArgs {
  @Field(() => InvitationTicketWhereUniqueInput, { nullable: false })
  where!: InvitationTicketWhereUniqueInput;
}

export { FindOneInvitationTicketArgs };
