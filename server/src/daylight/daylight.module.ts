import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DaylightService } from "./daylight.service";
import { DaylightController } from "./daylight.controller";
import { DaylightResolver } from "./daylight.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DaylightController],
  providers: [DaylightService, DaylightResolver],
  exports: [DaylightService],
})
export class DaylightModule {}
