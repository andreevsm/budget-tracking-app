import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IAccountModel } from '../entities/models/account.model';
import { GetAccountsQuery } from './use-cases/queries';

@Controller()
export class AccountController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('accounts')
  async getAll(): Promise<IAccountModel[]> {
    return this.queryBus.execute(new GetAccountsQuery(2));
  }
}
