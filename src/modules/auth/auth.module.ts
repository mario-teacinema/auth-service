import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { OtpModule } from "@/modules/otp/otp.module";
import { PassportModule } from "@mario-teacinema/passport";
import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";
import { passportConfigLoader } from "@/config/loaders";
import { UserRepository } from "@/shared/repositories";

@Module({
  imports: [
    OtpModule,
    PassportModule.registerAsync({
      useFactory: (configService: ConfigService<AllConfigs>) =>
        passportConfigLoader(configService),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UserRepository],
})
export class AuthModule {}
