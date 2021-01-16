import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DaDepictionService } from "./daDepiction.service";
import { DaDepictionController } from "./daDepiction.controller";
import { DaDepictionResolver } from "./daDepiction.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DaDepictionController],
  providers: [DaDepictionService, DaDepictionResolver],
  exports: [DaDepictionService],
})
export class DaDepictionModule {}
