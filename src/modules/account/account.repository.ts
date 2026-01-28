import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure";
import { Account, PendingContactChange } from "@prisma/generated/client";

@Injectable()
export class AccountRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string): Promise<Account | null> {
    return this.prismaService.account.findUnique({
      where: { id },
    });
  }

  public async findPendingChange(
    accountId: string,
    type: "email" | "phone",
  ): Promise<PendingContactChange | null> {
    return this.prismaService.pendingContactChange.findUnique({
      where: {
        accountId_type: {
          accountId,
          type,
        },
      },
    });
  }

  public async upsertPendingChange(data: {
    accountId: string;
    type: "email" | "phone";
    value: string;
    codeHash: string;
    expiresAt: Date;
  }): Promise<PendingContactChange | null> {
    const { accountId, type } = data;
    return this.prismaService.pendingContactChange.upsert({
      where: {
        accountId_type: {
          accountId,
          type,
        },
      },
      create: data,
      update: data,
    });
  }

  public async deletePendingChange(
    accountId: string,
    type: "email" | "phone",
  ): Promise<PendingContactChange | null> {
    return this.prismaService.pendingContactChange.delete({
      where: {
        accountId_type: {
          accountId,
          type,
        },
      },
    });
  }
}
