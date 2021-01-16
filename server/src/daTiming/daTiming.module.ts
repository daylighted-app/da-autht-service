import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DaTimingService } from "./daTiming.service";
import { DaTimingController } from "./daTiming.controller";
import { DaTimingResolver } from "./daTiming.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DaTimingController],
  providers: [DaTimingService, DaTimingResolver],
  exports: [DaTimingService],
})
export class DaTimingModule {}
