import { Injectable } from "@nestjs/common";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";
import { AuthRepository } from "./auth.repository";
import { Account } from "@prisma/generated/client";
import { OtpService } from "@/modules/otp/otp.service";
import { RpcException } from "@nestjs/microservices";
import { PassportService, TokenPayload } from "@mario-teacinema/passport";
import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_TTL: number = 0;

  private readonly REFRESH_TOKEN_TTL: number = 0;

  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly otpService: OtpService,
    private readonly passportService: PassportService,
    private readonly configService: ConfigService<AllConfigs>,
  ) {
    this.ACCESS_TOKEN_TTL =
      this.configService.get("passport.accessTtl", {
        infer: true,
      }) ?? 0;
    this.REFRESH_TOKEN_TTL =
      this.configService.get("passport.refreshTll", {
        infer: true,
      }) ?? 0;
  }

  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
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

    const { id } = account;

    if (type === "phone" && !account.isPhoneVerified) {
      await this.authRepository.update(account.id, {
        isPhoneVerified: true,
      });
    }

    if (type === "email" && !account.isEmailVerified) {
      await this.authRepository.update(account.id, {
        isEmailVerified: true,
      });
    }

    return this.#generateTokens(id);
  }

  #generateTokens(userId: string): {
    readonly accessToken: string;
    readonly refreshToken: string;
  } {
    const payload: TokenPayload = { sub: userId };

    const accessToken = this.passportService.generate(
      payload,
      this.ACCESS_TOKEN_TTL,
    );

    const refreshToken = this.passportService.generate(
      payload,
      this.REFRESH_TOKEN_TTL,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
