import { PrismaService } from "nestjs-prisma";
import {
  FindOneInvitationTicketArgs,
  FindManyInvitationTicketArgs,
  InvitationTicketCreateArgs,
  InvitationTicketUpdateArgs,
  InvitationTicketDeleteArgs,
  Subset,
} from "@prisma/client";

export class InvitationTicketServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyInvitationTicketArgs>(
    args: Subset<T, FindManyInvitationTicketArgs>
  ) {
    return this.prisma.invitationTicket.findMany(args);
  }
  findOne<T extends FindOneInvitationTicketArgs>(
    args: Subset<T, FindOneInvitationTicketArgs>
  ) {
    return this.prisma.invitationTicket.findOne(args);
  }
  create<T extends InvitationTicketCreateArgs>(
    args: Subset<T, InvitationTicketCreateArgs>
  ) {
    return this.prisma.invitationTicket.create<T>(args);
  }
  update<T extends InvitationTicketUpdateArgs>(
    args: Subset<T, InvitationTicketUpdateArgs>
  ) {
    return this.prisma.invitationTicket.update<T>(args);
  }
  delete<T extends InvitationTicketDeleteArgs>(
    args: Subset<T, InvitationTicketDeleteArgs>
  ) {
    return this.prisma.invitationTicket.delete(args);
  }
}
