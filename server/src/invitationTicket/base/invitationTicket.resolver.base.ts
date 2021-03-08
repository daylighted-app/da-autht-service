import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteInvitationTicketArgs } from "./DeleteInvitationTicketArgs";
import { FindManyInvitationTicketArgs } from "./FindManyInvitationTicketArgs";
import { FindOneInvitationTicketArgs } from "./FindOneInvitationTicketArgs";
import { InvitationTicket } from "./InvitationTicket";
import { InvitationTicketService } from "../invitationTicket.service";

@graphql.Resolver(() => InvitationTicket)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InvitationTicketResolverBase {
  constructor(
    protected readonly service: InvitationTicketService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [InvitationTicket])
  @nestAccessControl.UseRoles({
    resource: "InvitationTicket",
    action: "read",
    possession: "any",
  })
  async invitationTickets(
    @graphql.Args() args: FindManyInvitationTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InvitationTicket[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InvitationTicket",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => InvitationTicket, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InvitationTicket",
    action: "read",
    possession: "own",
  })
  async invitationTicket(
    @graphql.Args() args: FindOneInvitationTicketArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InvitationTicket | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InvitationTicket",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => InvitationTicket)
  @nestAccessControl.UseRoles({
    resource: "InvitationTicket",
    action: "delete",
    possession: "any",
  })
  async deleteInvitationTicket(
    @graphql.Args() args: DeleteInvitationTicketArgs
  ): Promise<InvitationTicket | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
