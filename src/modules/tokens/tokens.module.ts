import { Module } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { PassportModule } from "@mario-teacinema/passport";
import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";
import { passportConfigLoader } from "@/config/loaders";

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: (configService: ConfigService<AllConfigs>) =>
        passportConfigLoader(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
