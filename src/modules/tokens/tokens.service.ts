import { Injectable } from "@nestjs/common";
import { PassportService, TokenPayload } from "@mario-teacinema/passport";
import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";

@Injectable()
export class TokensService {
  private readonly ACCESS_TOKEN_TTL: number = 0;

  private readonly REFRESH_TOKEN_TTL: number = 0;

  public constructor(
    private readonly passportService: PassportService,
    private readonly configService: ConfigService<AllConfigs>,
  ) {
    this.ACCESS_TOKEN_TTL =
      this.configService.get("passport.accessTtl", {
        infer: true,
      }) ?? 0;
    this.REFRESH_TOKEN_TTL =
      this.configService.get("passport.refreshTll", {
        infer: true,
      }) ?? 0;
  }

  public generate(userId: string): {
    readonly accessToken: string;
    readonly refreshToken: string;
  } {
    const payload: TokenPayload = { sub: userId };

    const accessToken = this.passportService.generate(
      payload,
      this.ACCESS_TOKEN_TTL,
    );

    const refreshToken = this.passportService.generate(
      payload,
      this.REFRESH_TOKEN_TTL,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public verify(token: string) {
    return this.passportService.verify(token);
  }
}
