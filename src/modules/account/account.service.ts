import { Injectable } from "@nestjs/common";
import {
  GetAccountRequest,
  GetAccountResponse,
  Role,
} from "@mario-teacinema/contracts/gen/account";
import { AccountRepository } from "./account.repository";
import { RpcException } from "@nestjs/microservices";
import { convertEnum, RpcStatus } from "@mario-teacinema/common";

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
