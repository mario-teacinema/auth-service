import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./infrastructure";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "@/infrastructure";
import { OtpModule } from "./modules/otp/otp.module";
import { databaseEnv, grpcEnv } from "@/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseEnv, grpcEnv] }),
    PrismaModule,
    RedisModule,
    AuthModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
