import { Injectable } from "@nestjs/common";
import { Account } from "@prisma/generated/client";
import { PrismaService } from "@/infrastructure";
import { AccountUpdateInput } from "@prisma/generated/models";

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByPhone(phone: string): Promise<Account | null> {
    return await this.prismaService.account.findUnique({
      where: { phone },
    });
  }

  public async findByEmail(email: string): Promise<Account | null> {
    return await this.prismaService.account.findUnique({
      where: { email },
    });
  }

  public async update(id: string, data: AccountUpdateInput): Promise<Account> {
    return await this.prismaService.account.update({
      where: { id },
      data,
    });
  }
}
