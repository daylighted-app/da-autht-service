import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DaDepictionService } from "./daDepiction.service";
import { DeleteDaDepictionArgs } from "./DeleteDaDepictionArgs";
import { FindManyDaDepictionArgs } from "./FindManyDaDepictionArgs";
import { FindOneDaDepictionArgs } from "./FindOneDaDepictionArgs";
import { DaDepiction } from "./DaDepiction";

@graphql.Resolver(() => DaDepiction)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DaDepictionResolver {
  constructor(
    private readonly service: DaDepictionService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [DaDepiction])
  @nestAccessControl.UseRoles({
    resource: "DaDepiction",
    action: "read",
    possession: "any",
  })
  async daDepictions(
    @graphql.Args() args: FindManyDaDepictionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaDepiction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaDepiction",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DaDepiction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DaDepiction",
    action: "read",
    possession: "own",
  })
  async daDepiction(
    @graphql.Args() args: FindOneDaDepictionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaDepiction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DaDepiction",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DaDepiction)
  @nestAccessControl.UseRoles({
    resource: "DaDepiction",
    action: "delete",
    possession: "any",
  })
  async deleteDaDepiction(
    @graphql.Args() args: DeleteDaDepictionArgs
  ): Promise<DaDepiction | null> {
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
