import { Injectable } from "@nestjs/common";
import { RedisService } from "@/infrastructure";
import { createHash } from "node:crypto";
import { generateCode } from "patcode";

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

  private generate(): { code: string; hash: string } {
    const code = generateCode();
    const hash = createHash("sha256").update(String(code)).digest("hex");

    return {
      code,
      hash,
    };
  }
}
