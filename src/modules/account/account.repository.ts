import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure";
import { Account } from "@prisma/generated/client";

@Injectable()
export class AccountRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public findById(id: string): Promise<Account | null> {
    return this.prismaService.account.findUnique({
      where: { id },
    });
  }
}
