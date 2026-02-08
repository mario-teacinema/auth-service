import { GrpcConfig } from "./grpc-config";
import { DatabaseConfig } from "./database-config";
import { RedisConfig } from "./redis-config";
import { PassportConfig } from "./passport-config";
import { TelegramConfig } from "./telegram-config";
import { MetricsConfig } from "./metrics-config";

export interface AllConfigs {
  readonly database: DatabaseConfig;
  readonly redis: RedisConfig;
  readonly grpc: GrpcConfig;
  readonly passport: PassportConfig;
  readonly telegram: TelegramConfig;
  readonly metrics: MetricsConfig;
}
