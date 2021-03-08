import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { InvitationTicketResolverBase } from "./base/invitationTicket.resolver.base";
import { InvitationTicket } from "./base/InvitationTicket";
import { InvitationTicketService } from "./invitationTicket.service";

@graphql.Resolver(() => InvitationTicket)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InvitationTicketResolver extends InvitationTicketResolverBase {
  constructor(
    protected readonly service: InvitationTicketService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
