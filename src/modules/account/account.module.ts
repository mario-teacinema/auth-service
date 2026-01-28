import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { AccountRepository } from "@/modules/account/account.repository";
import { UserRepository } from "@/shared/repositories";
import { OtpService } from "@/modules/otp/otp.service";

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, UserRepository, OtpService],
})
export class AccountModule {}
