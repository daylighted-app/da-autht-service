import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { InvitationTicketServiceBase } from "./base/invitationTicket.service.base";

@Injectable()
export class InvitationTicketService extends InvitationTicketServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
