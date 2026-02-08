import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { AllConfigs } from "@/config";
import { createGrpcServer } from "@/infrastructure";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService<AllConfigs>);

  createGrpcServer(app, config);

  await app.startAllMicroservices();
  await app.init();

  const metricsPort = config.get("metrics.port", { infer: true })!;
  await app.listen(metricsPort);
}
bootstrap().then().catch(console.error);
