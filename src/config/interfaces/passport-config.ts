export interface PassportConfig {
  readonly secretKey: string;
  readonly accessTtl: number;
  readonly refreshTll: number;
}
