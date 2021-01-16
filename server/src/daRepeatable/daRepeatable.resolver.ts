import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DaRepeatableService } from "./daRepeatable.service";
import { DeleteDaRepeatableArgs } from "./DeleteDaRepeatableArgs";
import { FindManyDaRepeatableArgs } from "./FindManyDaRepeatableArgs";
import { FindOneDaRepeatableArgs } from "./FindOneDaRepeatableArgs";
import { DaRepeatable } from "./DaRepeatable";

@graphql.Resolver(() => DaRepeatable)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DaRepeatableResolver {
  constructor(
    private readonly service: DaRepeatableService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [DaRepeatable])
  @nestAccessControl.UseRoles({
    resource: "DaRepeatable",
    action: "read",
    possession: "any",
  })
  async daRepeatables(
    @graphql.Args() args: FindManyDaRepeatableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaRepeatable[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaRepeatable",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DaRepeatable, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DaRepeatable",
    action: "read",
    possession: "own",
  })
  async daRepeatable(
    @graphql.Args() args: FindOneDaRepeatableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaRepeatable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DaRepeatable",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DaRepeatable)
  @nestAccessControl.UseRoles({
    resource: "DaRepeatable",
    action: "delete",
    possession: "any",
  })
  async deleteDaRepeatable(
    @graphql.Args() args: DeleteDaRepeatableArgs
  ): Promise<DaRepeatable | null> {
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
