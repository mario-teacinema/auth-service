import { IsNumber, IsString } from "class-validator";

export class GrpcValidator {
  @IsString()
  public readonly GRPC_HOST: string;

  @IsNumber()
  public readonly GRPC_PORT: number;
}
