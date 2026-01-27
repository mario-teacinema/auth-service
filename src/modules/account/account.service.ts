import { Injectable } from "@nestjs/common";
import {
  type GetAccountRequest,
  type GetAccountResponse,
} from "@mario-teacinema/contracts/gen/account";
import { AccountRepository } from "./account.repository";
import { RpcException } from "@nestjs/microservices";
import { convertEnum, RpcStatus } from "@mario-teacinema/common";

enum Role {
  USER = 0,
  ADMIN = 1,
  UNRECOGNIZED = -1,
}

@Injectable()
export class AccountService {
  public constructor(private readonly accountRepository: AccountRepository) {}

  public async getAccount(
    data: GetAccountRequest,
  ): Promise<GetAccountResponse> {
    const { id } = data;
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        description: "Account not found",
      });
    }

    const { phone, email, isPhoneVerified, isEmailVerified, role } = account;

    return {
      id,
      phone: phone ?? "",
      email: email ?? "",
      isPhoneVerified,
      isEmailVerified,
      role: convertEnum(Role, role),
    };
  }
}
