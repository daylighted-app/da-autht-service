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
import { CreateDaRepeatableArgs } from "./CreateDaRepeatableArgs";
import { UpdateDaRepeatableArgs } from "./UpdateDaRepeatableArgs";
import { DeleteDaRepeatableArgs } from "./DeleteDaRepeatableArgs";
import { FindManyDaRepeatableArgs } from "./FindManyDaRepeatableArgs";
import { FindOneDaRepeatableArgs } from "./FindOneDaRepeatableArgs";
import { DaRepeatable } from "./DaRepeatable";
import { Daylight } from "../daylight/Daylight";

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
    action: "create",
    possession: "any",
  })
  async createDaRepeatable(
    @graphql.Args() args: CreateDaRepeatableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaRepeatable> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DaRepeatable",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"DaRepeatable"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        daylight: {
          connect: args.data.daylight,
        },
      },
    });
  }

  @graphql.Mutation(() => DaRepeatable)
  @nestAccessControl.UseRoles({
    resource: "DaRepeatable",
    action: "update",
    possession: "any",
  })
  async updateDaRepeatable(
    @graphql.Args() args: UpdateDaRepeatableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaRepeatable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DaRepeatable",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"DaRepeatable"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          daylight: {
            connect: args.data.daylight,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
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

  @graphql.ResolveField(() => Daylight, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DaRepeatable",
    action: "read",
    possession: "any",
  })
  async daylight(
    @graphql.Parent() parent: DaRepeatable,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Daylight",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .daylight();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
