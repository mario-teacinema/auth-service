import { IsNumber, IsString } from "class-validator";

export class PassportValidator {
  @IsString()
  public readonly PASSPORT_SECRET_KEY: string;

  @IsNumber()
  public readonly PASSPORT_ACCESS_TTL: number;

  @IsNumber()
  public readonly PASSPORT_REFRESH_TTL: number;
}
