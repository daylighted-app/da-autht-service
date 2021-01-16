import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DaFeelingService } from "./daFeeling.service";
import { DaFeelingController } from "./daFeeling.controller";
import { DaFeelingResolver } from "./daFeeling.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DaFeelingController],
  providers: [DaFeelingService, DaFeelingResolver],
  exports: [DaFeelingService],
})
export class DaFeelingModule {}
