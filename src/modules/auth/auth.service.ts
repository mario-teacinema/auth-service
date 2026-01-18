import { Injectable } from "@nestjs/common";
import {
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";
import { AuthRepository } from "./auth.repository";
import { Account } from "@prisma/generated/client";
import { OtpService } from "@/modules/otp/otp.service";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly otpService: OtpService,
  ) {}

  public async sendOtp(data: SendOtpRequest): Promise<any> {
    const { identifier, type } = data;

    let account: Account | null = null;

    if (type === "phone") {
      account = await this.authRepository.findByPhone(identifier);
    } else if (type === "email") {
      account = await this.authRepository.findByEmail(identifier);
    }

    if (!account) {
      account = await this.authRepository.create({
        email: type === "email" ? identifier : undefined,
        phone: type === "phone" ? identifier : undefined,
      });
    }

    const code = await this.otpService.send(
      identifier,
      type as "phone" | "email",
    );

    console.debug("CODE", code);

    return {
      ok: true,
    };
  }

  public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const { identifier, code, type } = data;

    await this.otpService.verify(identifier, code, type as "phone" | "email");

    let account: Account | null = null;

    if (type === "phone") {
      account = await this.authRepository.findByPhone(identifier);
    } else if (type === "email") {
      account = await this.authRepository.findByEmail(identifier);
    }

    if (!account) {
      throw new RpcException({
        code: 5,
        details: "Account not found",
      });
    }

    if (type === "phone" && !account.isPhoneVerified) {
      await this.authRepository.update(account.id, {
        isPhoneVerified: true,
      });
    }

    if (type === "email" && !account.isPhoneVerified) {
      await this.authRepository.update(account.id, {
        isEmailVerified: true,
      });
    }

    return {
      accessToken: "123456",
      refreshToken: "123456",
    };
  }
}
