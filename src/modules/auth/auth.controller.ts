import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GrpcMethod } from "@nestjs/microservices";

import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @GrpcMethod("AuthService", "sendOtp")
  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    return this.authService.sendOtp(data);
  }

  @GrpcMethod("AuthService", "verifyOtp")
  public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.authService.verifyOtp(data);
  }
}
