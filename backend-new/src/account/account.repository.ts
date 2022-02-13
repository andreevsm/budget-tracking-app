import { Injectable } from "@nestjs/common";
import { IAccountModel } from "../entities/models/account.model";

@Injectable()
export class AccountRepository {

  async findByUserId(userId: number): Promise<IAccountModel[]> {
    return [
      {
        id: 1,
        user_id: userId,
        name: 'test',
        description: 'test',
        created_at: new Date(),
        updated_at: new Date(),
        currency_id: 1,
        amount: 1,
      }
    ];
  }
}