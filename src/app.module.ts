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
} from "@/config";
import { AccountModule } from "./modules/account/account.module";
import { TelegramModule } from "./modules/telegram/telegram.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseEnv, grpcEnv, passportEnv, redisEnv, telegramEnv],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    AccountModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
