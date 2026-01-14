import { Injectable } from "@nestjs/common";
import { SendOtpRequest } from "@mario-teacinema/contracts/gen/auth";
import { AuthRepository } from "./auth.repository";
import { Account } from "@prisma/generated/client";
import { OtpService } from "@/modules/otp/otp.service";

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
}
