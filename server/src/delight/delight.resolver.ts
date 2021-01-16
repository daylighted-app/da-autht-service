import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DelightService } from "./delight.service";
import { CreateDelightArgs } from "./CreateDelightArgs";
import { UpdateDelightArgs } from "./UpdateDelightArgs";
import { DeleteDelightArgs } from "./DeleteDelightArgs";
import { FindManyDelightArgs } from "./FindManyDelightArgs";
import { FindOneDelightArgs } from "./FindOneDelightArgs";
import { Delight } from "./Delight";
import { FindManyDaylightArgs } from "../daylight/FindManyDaylightArgs";
import { Daylight } from "../daylight/Daylight";

@graphql.Resolver(() => Delight)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DelightResolver {
  constructor(
    private readonly service: DelightService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Delight])
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "read",
    possession: "any",
  })
  async delights(
    @graphql.Args() args: FindManyDelightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Delight[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Delight",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Delight, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "read",
    possession: "own",
  })
  async delight(
    @graphql.Args() args: FindOneDelightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Delight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Delight",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Delight)
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "create",
    possession: "any",
  })
  async createDelight(
    @graphql.Args() args: CreateDelightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Delight> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Delight",
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
        `providing the properties: ${properties} on ${"Delight"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Delight)
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "update",
    possession: "any",
  })
  async updateDelight(
    @graphql.Args() args: UpdateDelightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Delight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Delight",
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
        `providing the properties: ${properties} on ${"Delight"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Delight)
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "delete",
    possession: "any",
  })
  async deleteDelight(
    @graphql.Args() args: DeleteDelightArgs
  ): Promise<Delight | null> {
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

  @graphql.ResolveField(() => [Daylight])
  @nestAccessControl.UseRoles({
    resource: "Delight",
    action: "read",
    possession: "any",
  })
  async daylights(
    @graphql.Parent() parent: Delight,
    @graphql.Args() args: FindManyDaylightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Daylight",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .daylights(args);
    return results.map((result) => permission.filter(result));
  }
}
