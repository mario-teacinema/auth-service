import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";
import { PassportOptions } from "@mario-teacinema/passport";

export const passportConfigLoader = (
  configService: ConfigService<AllConfigs>,
): PassportOptions => {
  return {
    secretKey:
      configService.get("passport.secretKey", {
        infer: true,
      }) ?? "",
  };
};
