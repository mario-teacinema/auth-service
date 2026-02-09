import { IsNumber } from "class-validator";

export class MetricsValidator {
  @IsNumber()
  readonly METRICS_PORT: number;
}
