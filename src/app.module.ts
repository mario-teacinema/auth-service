import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./infrastructure";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./infrastructure/redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
