import { Controller } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { GrpcMethod } from "@nestjs/microservices";
import { TelegramInitResponse } from "@mario-teacinema/contracts/gen/auth";

@Controller()
export class TelegramController {
  public constructor(private readonly telegramService: TelegramService) {}

  @GrpcMethod("AuthService", "TelegramInit")
  public async getAuthUrl(): Promise<TelegramInitResponse> {
    return this.telegramService.getTelegramAuthUrl();
  }
}
