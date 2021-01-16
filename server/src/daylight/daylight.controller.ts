import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { DaylightService } from "./daylight.service";
import { DaylightCreateInput } from "./DaylightCreateInput";
import { DaylightWhereInput } from "./DaylightWhereInput";
import { DaylightWhereUniqueInput } from "./DaylightWhereUniqueInput";
import { DaylightUpdateInput } from "./DaylightUpdateInput";
import { Daylight } from "./Daylight";
import { DaDepictionWhereInput } from "../daDepiction/DaDepictionWhereInput";
import { DaDepiction } from "../daDepiction/DaDepiction";
import { DaFeelingWhereInput } from "../daFeeling/DaFeelingWhereInput";
import { DaFeeling } from "../daFeeling/DaFeeling";

@swagger.ApiBasicAuth()
@swagger.ApiTags("daylights")
@common.Controller("daylights")
export class DaylightController {
  constructor(
    private readonly service: DaylightService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Daylight })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: DaylightCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Daylight> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Daylight",
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
        `providing the properties: ${properties} on ${"Daylight"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        repeatition: data.repeatition
          ? {
              connect: data.repeatition,
            }
          : undefined,

        timing: data.timing
          ? {
              connect: data.timing,
            }
          : undefined,

        userId: data.userId
          ? {
              connect: data.userId,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        repeatition: {
          select: {
            id: true,
          },
        },

        score: true,

        timing: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Daylight] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: DaylightWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Daylight[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Daylight",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,

        repeatition: {
          select: {
            id: true,
          },
        },

        score: true,

        timing: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Daylight })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: DaylightWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Daylight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Daylight",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,

        repeatition: {
          select: {
            id: true,
          },
        },

        score: true,

        timing: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        userId: {
          select: {
            id: true,
          },
        },
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
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Daylight })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body()
    data: DaylightUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Daylight | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
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
        `providing the properties: ${properties} on ${"Daylight"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          repeatition: data.repeatition
            ? {
                connect: data.repeatition,
              }
            : undefined,

          timing: data.timing
            ? {
                connect: data.timing,
              }
            : undefined,

          userId: data.userId
            ? {
                connect: data.userId,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,

          repeatition: {
            select: {
              id: true,
            },
          },

          score: true,

          timing: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          userId: {
            select: {
              id: true,
            },
          },
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
    resource: "Daylight",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Daylight })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: DaylightWhereUniqueInput
  ): Promise<Daylight | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,

          repeatition: {
            select: {
              id: true,
            },
          },

          score: true,

          timing: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          userId: {
            select: {
              id: true,
            },
          },
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
  @common.Get("/:id/depictions")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async findManyDepictions(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Query() query: DaDepictionWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaDepiction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaDepiction",
    });
    const results = await this.service.findOne({ where: params }).depictions({
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
  @common.Post("/:id/depictions")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async createDepictions(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      depictions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/depictions")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async updateDepictions(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      depictions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/depictions")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async deleteDepictions(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      depictions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/feelings")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "read",
    possession: "any",
  })
  async findManyFeelings(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Query() query: DaFeelingWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DaFeeling[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DaFeeling",
    });
    const results = await this.service.findOne({ where: params }).feelings({
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
  @common.Post("/:id/feelings")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async createFeelings(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      feelings: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/feelings")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async updateFeelings(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      feelings: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/feelings")
  @nestAccessControl.UseRoles({
    resource: "Daylight",
    action: "update",
    possession: "any",
  })
  async deleteFeelings(
    @common.Param() params: DaylightWhereUniqueInput,
    @common.Body() body: DaylightWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      feelings: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Daylight",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Daylight"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
