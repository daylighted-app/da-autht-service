import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { DaRepeatableService } from "./daRepeatable.service";
import { DaRepeatableController } from "./daRepeatable.controller";
import { DaRepeatableResolver } from "./daRepeatable.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [DaRepeatableController],
  providers: [DaRepeatableService, DaRepeatableResolver],
  exports: [DaRepeatableService],
})
export class DaRepeatableModule {}
