import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { OtpModule } from "@/modules/otp/otp.module";
import { PassportModule } from "@mario-teacinema/passport";

@Module({
  imports: [
    OtpModule,
    PassportModule.register({
      secretKey: "123456",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
