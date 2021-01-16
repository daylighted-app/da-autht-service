import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DaFeelingService } from "./daFeeling.service";
import { DeleteDaFeelingArgs } from "./DeleteDaFeelingArgs";
import { FindManyDaFeelingArgs } from "./FindManyDaFeelingArgs";
import { FindOneDaFeelingArgs } from "./FindOneDaFeelingArgs";
import { DaFeeling } from "./DaFeeling";

@graphql.Resolver(() => DaFeeling)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DaFeelingResolver {
  constructor(
    private readonly service: DaFeelingService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [DaFeeling])
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "read",
    possession: "any",
  })
  async daFeelings(
    @graphql.Args() args: FindManyDaFeelingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaFeeling[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaFeeling",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DaFeeling, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "read",
    possession: "own",
  })
  async daFeeling(
    @graphql.Args() args: FindOneDaFeelingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaFeeling | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DaFeeling",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DaFeeling)
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "delete",
    possession: "any",
  })
  async deleteDaFeeling(
    @graphql.Args() args: DeleteDaFeelingArgs
  ): Promise<DaFeeling | null> {
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
