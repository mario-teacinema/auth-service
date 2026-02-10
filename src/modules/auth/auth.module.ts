import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { OtpModule } from "@/modules/otp/otp.module";
import { UserRepository } from "@/shared/repositories";
import { TokensService } from "@/modules/tokens/tokens.service";

@Module({
  imports: [OtpModule],
  controllers: [AuthController],
  providers: [TokensService, AuthService, AuthRepository, UserRepository],
})
export class AuthModule {}
