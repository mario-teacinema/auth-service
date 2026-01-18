import { Injectable } from "@nestjs/common";
import { RedisService } from "@/infrastructure";
import { createHash } from "node:crypto";
import { generateCode } from "patcode";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class OtpService {
  public constructor(private readonly redisService: RedisService) {}

  public async send(
    identifier: string,
    type: "phone" | "email",
  ): Promise<{ code: string }> {
    const { code, hash } = this.generate();

    await this.redisService.set(`otp:${type}:${identifier}`, hash, "EX", 300);

    return { code };
  }

  public async verify(
    identifier: string,
    code: string,
    type: "phone" | "email",
  ): Promise<void> {
    const storedHash = await this.redisService.get(`otp:${type}:${identifier}`);

    if (!storedHash) {
      throw new RpcException({
        code: 5,
        details: "Invalid or expired code",
      });
    }

    const incomingHash = createHash("sha256")
      .update(String(code))
      .digest("hex");

    if (storedHash !== incomingHash) {
      throw new RpcException({
        code: 5,
        details: "Invalid or expired code",
      });
    }

    await this.redisService.del(`otp:${type}:${identifier}`);
  }

  private generate(): { code: string; hash: string } {
    const code = generateCode();
    const hash = createHash("sha256").update(String(code)).digest("hex");

    return {
      code,
      hash,
    };
  }
}
