import { registerAs } from "@nestjs/config";
import { MetricsConfig } from "../interfaces";
import { validateEnv } from "@/shared/utils/env";
import { MetricsValidator } from "../validators";

export const metricsEnv = registerAs<MetricsConfig>("metrics", () => {
    validateEnv(process.env, MetricsValidator);

    return {
        port: parseInt(process.env.METRICS_PORT ?? "9091"),
    } satisfies MetricsConfig;
});
