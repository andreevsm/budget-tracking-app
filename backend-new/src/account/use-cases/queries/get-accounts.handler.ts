import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../account.repository';
import { GetAccountsQuery } from './get-accounts.impl';

@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler implements IQueryHandler<GetAccountsQuery> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(query: GetAccountsQuery): Promise<any> {
    return this.accountRepository.findByUserId(query.userId);
  }
}
