import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DelightService } from "./delight.service";
import { DelightController } from "./delight.controller";
import { DelightResolver } from "./delight.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DelightController],
  providers: [DelightService, DelightResolver],
  exports: [DelightService],
})
export class DelightModule {}
