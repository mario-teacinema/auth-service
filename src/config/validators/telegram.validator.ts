import { IsString, IsUrl } from "class-validator";

export class TelegramValidator {
  @IsString()
  public readonly TELEGRAM_BOT_ID: string;

  @IsString()
  public readonly TELEGRAM_BOT_TOKEN: string;

  @IsString()
  public readonly TELEGRAM_BOT_USERNAME: string;

  @IsUrl()
  @IsString()
  public readonly TELEGRAM_REDIRECT_ORIGIN: string;
}
