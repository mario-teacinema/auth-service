import { registerAs } from "@nestjs/config";
import { validateEnv } from "@/shared/utils/env";
import { DatabaseValidator } from "../validators";
import { DatabaseConfig } from "../interfaces";

export const databaseEnv = registerAs<DatabaseConfig>("database", () => {
  validateEnv(process.env, DatabaseValidator);

  return {
    user: process.env.DATABASE_USER ?? "",
    password: process.env.DATABASE_PASSWORD ?? "",
    host: process.env.DATABASE_HOST ?? "",
    name: process.env.DATABASE_NAME ?? "",
    port: parseInt(process.env.DATABASE_PORT ?? ""),
  } satisfies DatabaseConfig;
});
