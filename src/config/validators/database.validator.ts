import { Type } from "class-transformer";
import { IsInt, IsString, Max, Min } from "class-validator";

export class DatabaseValidator {
  @IsString()
  public readonly DATABASE_USER: string;

  @IsString()
  public readonly DATABASE_PASSWORD: string;

  @IsString()
  public readonly DATABASE_HOST: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  public readonly DATABASE_PORT: number;

  @IsString()
  public readonly DATABASE_NAME: string;
}
