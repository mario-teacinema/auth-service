import { Type } from "class-transformer";
import { IsInt, IsString, Max, Min } from "class-validator";

export class RedisValidator {
  @IsString()
  public readonly REDIS_USER: string;

  @IsString()
  public readonly REDIS_PASSWORD: string;

  @IsString()
  public readonly REDIS_HOST: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  public readonly REDIS_PORT: number;
}
