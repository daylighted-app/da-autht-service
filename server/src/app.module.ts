import { Module } from "@nestjs/common";
import { DaFeelingModule } from "./daFeeling/daFeeling.module";
import { DaDepictionModule } from "./daDepiction/daDepiction.module";
import { UserModule } from "./user/user.module";
import { DaTimingModule } from "./daTiming/daTiming.module";
import { DaylightModule } from "./daylight/daylight.module";
import { DaRepeatableModule } from "./daRepeatable/daRepeatable.module";
import { DelightModule } from "./delight/delight.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    DaFeelingModule,
    DaDepictionModule,
    UserModule,
    DaTimingModule,
    DaylightModule,
    DaRepeatableModule,
    DelightModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
