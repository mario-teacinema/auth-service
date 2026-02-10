import { Controller } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { GrpcMethod } from "@nestjs/microservices";
import type {
  TelegramInitResponse,
  TelegramVerifyRequest,
  TelegramVerifyResponse,
} from "@mario-teacinema/contracts/gen/auth";

@Controller()
export class TelegramController {
  public constructor(private readonly telegramService: TelegramService) {}

  @GrpcMethod("AuthService", "TelegramInit")
  public async getAuthUrl(): Promise<TelegramInitResponse> {
    return this.telegramService.getTelegramAuthUrl();
  }

  @GrpcMethod("AuthService", "TelegramVerify")
  public async verify(
    data: TelegramVerifyRequest,
  ): Promise<TelegramVerifyResponse> {
    return this.telegramService.verify(data);
  }
}
