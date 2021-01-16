import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DaTimingService } from "./daTiming.service";
import { DeleteDaTimingArgs } from "./DeleteDaTimingArgs";
import { FindManyDaTimingArgs } from "./FindManyDaTimingArgs";
import { FindOneDaTimingArgs } from "./FindOneDaTimingArgs";
import { DaTiming } from "./DaTiming";

@graphql.Resolver(() => DaTiming)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DaTimingResolver {
  constructor(
    private readonly service: DaTimingService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [DaTiming])
  @nestAccessControl.UseRoles({
    resource: "DaTiming",
    action: "read",
    possession: "any",
  })
  async daTiming(
    @graphql.Args() args: FindManyDaTimingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaTiming[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaTiming",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DaTiming, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DaTiming",
    action: "read",
    possession: "own",
  })
  async daTiming(
    @graphql.Args() args: FindOneDaTimingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaTiming | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DaTiming",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DaTiming)
  @nestAccessControl.UseRoles({
    resource: "DaTiming",
    action: "delete",
    possession: "any",
  })
  async deleteDaTiming(
    @graphql.Args() args: DeleteDaTimingArgs
  ): Promise<DaTiming | null> {
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
