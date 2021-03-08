import { Module } from "@nestjs/common";
import { InvitationTicketModuleBase } from "./base/invitationTicket.module.base";
import { InvitationTicketService } from "./invitationTicket.service";
import { InvitationTicketController } from "./invitationTicket.controller";
import { InvitationTicketResolver } from "./invitationTicket.resolver";

@Module({
  imports: [InvitationTicketModuleBase],
  controllers: [InvitationTicketController],
  providers: [InvitationTicketService, InvitationTicketResolver],
  exports: [InvitationTicketService],
})
export class InvitationTicketModule {}
