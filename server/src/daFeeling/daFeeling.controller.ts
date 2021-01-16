import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { DaFeelingService } from "./daFeeling.service";
import { DaFeelingCreateInput } from "./DaFeelingCreateInput";
import { DaFeelingWhereInput } from "./DaFeelingWhereInput";
import { DaFeelingWhereUniqueInput } from "./DaFeelingWhereUniqueInput";
import { DaFeelingUpdateInput } from "./DaFeelingUpdateInput";
import { DaFeeling } from "./DaFeeling";

@swagger.ApiBasicAuth()
@swagger.ApiTags("da-feelings")
@common.Controller("da-feelings")
export class DaFeelingController {
  constructor(
    private readonly service: DaFeelingService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: DaFeeling })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: DaFeelingCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaFeeling> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DaFeeling",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"DaFeeling"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [DaFeeling] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: DaFeelingWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaFeeling[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaFeeling",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: DaFeeling })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: DaFeelingWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaFeeling | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DaFeeling",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DaFeeling })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: DaFeelingWhereUniqueInput,
    @common.Body()
    data: DaFeelingUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaFeeling | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DaFeeling",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"DaFeeling"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "DaFeeling",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DaFeeling })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: DaFeelingWhereUniqueInput
  ): Promise<DaFeeling | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
