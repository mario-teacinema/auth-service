import { registerAs } from "@nestjs/config";
import { validateEnv } from "@/shared/utils/env";
import { TelegramValidator } from "../validators";
import { TelegramConfig } from "../interfaces";

export const telegramEnv = registerAs<TelegramConfig>("telegram", () => {
  validateEnv(process.env, TelegramValidator);

  return {
    botId: process.env.TELEGRAM_BOT_ID ?? "",
    botToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
    botUserName: process.env.TELEGRAM_BOT_USERNAME ?? "",
    redirectOrigin: process.env.TELEGRAM_REDIRECT_ORIGIN ?? "",
  } satisfies TelegramConfig;
});
