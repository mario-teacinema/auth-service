import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./infrastructure";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "@/infrastructure";
import {
  databaseEnv,
  grpcEnv,
  metricsEnv,
  passportEnv,
  redisEnv,
  telegramEnv,
} from "@/config";
import { AccountModule } from "./modules/account/account.module";
import { TelegramModule } from "./modules/telegram/telegram.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseEnv,
        grpcEnv,
        passportEnv,
        redisEnv,
        telegramEnv,
        metricsEnv,
      ],
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
export class AppModule {}
