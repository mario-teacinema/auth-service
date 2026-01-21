import { GrpcConfig } from "./grpc-config";
import { DatabaseConfig } from "./database-config";

export interface AllConfigs {
  readonly database: DatabaseConfig;
  readonly grpc: GrpcConfig;
}
