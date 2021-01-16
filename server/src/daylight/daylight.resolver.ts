import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DaylightService } from "./daylight.service";
import { CreateDaylightArgs } from "./CreateDaylightArgs";
import { UpdateDaylightArgs } from "./UpdateDaylightArgs";
import { DeleteDaylightArgs } from "./DeleteDaylightArgs";
import { FindManyDaylightArgs } from "./FindManyDaylightArgs";
import { FindOneDaylightArgs } from "./FindOneDaylightArgs";
import { Daylight } from "./Daylight";
import { FindManyDaDepictionArgs } from "../daDepiction/FindManyDaDepictionArgs";
import { DaDepiction } from "../daDepiction/DaDepiction";
import { FindManyDaFeelingArgs } from "../daFeeling/FindManyDaFeelingArgs";
import { DaFeeling } from "../daFeeling/DaFeeling";
import { DaRepeatable } from "../daRepeatable/DaRepeatable";
import { DaTiming } from "../daTiming/DaTiming";
import { User } from "../user/User";

@graphql.Resolver(() => Daylight)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DaylightResolver {
  constructor(
    private readonly service: DaylightService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Daylight])
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async daylights(
    @graphql.Args() args: FindManyDaylightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Daylight",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Daylight, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "own",
  })
  async daylight(
    @graphql.Args() args: FindOneDaylightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Daylight",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Daylight)
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "create",
    possession: "any",
  })
  async createDaylight(
    @graphql.Args() args: CreateDaylightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Daylight",
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
        `providing the properties: ${properties} on ${"Daylight"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        repeatition: args.data.repeatition
          ? {
              connect: args.data.repeatition,
            }
          : undefined,

        timing: args.data.timing
          ? {
              connect: args.data.timing,
            }
          : undefined,

        userId: args.data.userId
          ? {
              connect: args.data.userId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Daylight)
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async updateDaylight(
    @graphql.Args() args: UpdateDaylightArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Daylight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
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
        `providing the properties: ${properties} on ${"Daylight"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          repeatition: args.data.repeatition
            ? {
                connect: args.data.repeatition,
              }
            : undefined,

          timing: args.data.timing
            ? {
                connect: args.data.timing,
              }
            : undefined,

          userId: args.data.userId
            ? {
                connect: args.data.userId,
              }
            : undefined,
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

  @graphql.Mutation(() => Daylight)
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "delete",
    possession: "any",
  })
  async deleteDaylight(
    @graphql.Args() args: DeleteDaylightArgs
  ): Promise<Daylight | null> {
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

  @graphql.ResolveField(() => [DaDepiction])
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async daDepictions(
    @graphql.Parent() parent: Daylight,
    @graphql.Args() args: FindManyDaDepictionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaDepiction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaDepiction",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .depictions(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [DaFeeling])
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async daFeelings(
    @graphql.Parent() parent: Daylight,
    @graphql.Args() args: FindManyDaFeelingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaFeeling[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaFeeling",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .feelings(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => DaRepeatable, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async daRepeatable(
    @graphql.Parent() parent: Daylight,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaRepeatable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaRepeatable",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .repeatition();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => DaTiming, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async daTiming(
    @graphql.Parent() parent: Daylight,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DaTiming | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaTiming",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .timing();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Daylight,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .userId();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
