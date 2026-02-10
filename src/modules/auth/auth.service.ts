import { Injectable } from "@nestjs/common";
import {
  RefreshRequest,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";
import { AuthRepository } from "./auth.repository";
import { Account } from "@prisma/generated/client";
import { OtpService } from "@/modules/otp/otp.service";
import { RpcException } from "@nestjs/microservices";
import { PassportService } from "@mario-teacinema/passport";
import { RpcStatus } from "@mario-teacinema/common";
import { UserRepository } from "@/shared/repositories";
import { TokensService } from "@/modules/tokens/tokens.service";

@Injectable()
export class AuthService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly passportService: PassportService,
    private readonly tokensService: TokensService,
  ) {}

  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    const { identifier, type } = data;

    let account: Account | null = null;

    if (type === "phone") {
      account = await this.userRepository.findByPhone(identifier);
    } else if (type === "email") {
      account = await this.userRepository.findByEmail(identifier);
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

    console.log("CODE: ", code);

    return {
      ok: true,
    };
  }

  public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const { identifier, code, type } = data;

    await this.otpService.verify(identifier, code, type as "phone" | "email");

    let account: Account | null = null;

    if (type === "phone") {
      account = await this.userRepository.findByPhone(identifier);
    } else if (type === "email") {
      account = await this.userRepository.findByEmail(identifier);
    }

    if (!account) {
      throw new RpcException({
        code: 5,
        details: "Account not found",
      });
    }

    const { id } = account;

    if (type === "phone" && !account.isPhoneVerified) {
      await this.userRepository.update(account.id, {
        isPhoneVerified: true,
      });
    }

    if (type === "email" && !account.isEmailVerified) {
      await this.userRepository.update(account.id, {
        isEmailVerified: true,
      });
    }

    return this.tokensService.generate(id);
  }

  public refresh(data: RefreshRequest): {
    readonly accessToken: string;
    readonly refreshToken: string;
  } {
    const { refreshToken } = data;

    const result = this.passportService.verify(refreshToken);
    const { valid, userId } = result;
    if (!valid) {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        details: result.reason,
      });
    }

    return this.tokensService.generate(String(userId));
  }
}
