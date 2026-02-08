import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./infrastructure";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "@/infrastructure";
import {
  databaseEnv,
  grpcEnv,
  passportEnv,
  redisEnv,
  telegramEnv,
  metricsEnv,
} from "@/config";
import { AccountModule } from "./modules/account/account.module";
import { TelegramModule } from "./modules/telegram/telegram.module";
import { HealthModule } from "./modules/health/health.module";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseEnv, grpcEnv, passportEnv, redisEnv, telegramEnv, metricsEnv],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    AccountModule,
    TelegramModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
