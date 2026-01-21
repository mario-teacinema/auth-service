import { GrpcConfig } from "./grpc-config";
import { DatabaseConfig } from "./database-config";
import { RedisConfig } from "./redis-config";

export interface AllConfigs {
  readonly database: DatabaseConfig;
  readonly redis: RedisConfig;
  readonly grpc: GrpcConfig;
}
