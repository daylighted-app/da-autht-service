import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InvitationTicketService } from "./invitationTicket.service";
import { InvitationTicketControllerBase } from "./base/invitationTicket.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("invitation-tickets")
@common.Controller("invitation-tickets")
export class InvitationTicketController extends InvitationTicketControllerBase {
  constructor(
    protected readonly service: InvitationTicketService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
