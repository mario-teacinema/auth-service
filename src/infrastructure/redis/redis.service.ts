import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RedisService.name);

  public constructor(private readonly configService: ConfigService) {
    super({
      username: configService.getOrThrow<string>("REDIS_USER"),
      password: configService.getOrThrow<string>("REDIS_PASSWORD"),
      host: configService.getOrThrow<string>("REDIS_HOST"),
      port: configService.getOrThrow<number>("REDIS_PORT"),
      maxRetriesPerRequest: 5,
      enableOfflineQueue: true,
    });
  }

  public async onModuleInit(): Promise<void> {
    const start = Date.now();
    this.logger.log("Initializing Redis connection...");
    try {
      this.on("connect", () => {
        this.logger.log("Redis connection...");
      });
      this.on("ready", () => {
        const ms = Date.now() - start;
        this.logger.log(`Redis connected (time=${ms}ms)`);
      });
      this.on("error", (error) => {
        this.logger.error(`Redis error`, {
          error: error.message ?? error,
        });
      });
      this.on("close", () => {
        this.logger.warn(`Redis connection closed`);
      });
      this.on("reconnecting", () => {
        this.logger.log(`Redis reconnecting...`);
      });
    } catch (error) {
      this.logger.error("Failed to connect to redis: ", error);

      throw error;
    }
  }

  public async onModuleDestroy() {
    this.logger.log("Closing Redis connection...");

    try {
      await this.quit();

      this.logger.log(`Redis connection closed`);
    } catch (error) {
      this.logger.error(`Error closing Redis connection`, {
        error: error.message ?? error,
      });

      throw error;
    }
  }
}
