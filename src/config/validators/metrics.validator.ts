import { IsNumber } from "class-validator";
import { MetricsConfig } from "../interfaces";

export class MetricsValidator implements MetricsConfig {
    @IsNumber()
    port: number;
}
