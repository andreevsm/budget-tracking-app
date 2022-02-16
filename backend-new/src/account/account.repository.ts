import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { IAccountModel } from '../entities/models/account.model';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async findByUserId(userId: number): Promise<IAccountModel[]> {
    return this.accountRepository.find({ user_id: userId });
  }
}
