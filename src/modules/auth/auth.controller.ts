import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GrpcMethod } from "@nestjs/microservices";

import type {
  RefreshRequest,
  RefreshResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@mario-teacinema/contracts/gen/auth";

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @GrpcMethod("AuthService", "SendOtp")
  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    return this.authService.sendOtp(data);
  }

  @GrpcMethod("AuthService", "VerifyOtp")
  public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.authService.verifyOtp(data);
  }

  @GrpcMethod("AuthService", "Refresh")
  public async refresh(data: RefreshRequest): Promise<RefreshResponse> {
    return await this.authService.refresh(data);
  }
}
