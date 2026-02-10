import { PrismaService } from "@/infrastructure";
import { Account } from "@prisma/generated/client";

export class TelegramRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByTelegramId(telegramId: string): Promise<Account | null> {
    return this.prismaService.account.findUnique({
      where: {
        telegramId,
      },
    });
  }
}
