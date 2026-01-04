import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GrpcMethod } from "@nestjs/microservices";

import type {
  SendOtpRequest,
  SendOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @GrpcMethod("AuthService", "sendOtp")
  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    console.log(`Incoming OTP request: `, data);
    return {
      ok: true,
    };
  }
}
