import { Module } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { TelegramController } from "./telegram.controller";
import { TelegramRepository } from "./telegram.repository";
import { TokensService } from "@/modules/tokens/tokens.service";

@Module({
  controllers: [TelegramController],
  providers: [TelegramService, TelegramRepository, TokensService],
})
export class TelegramModule {}
