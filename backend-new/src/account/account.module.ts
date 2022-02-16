import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { GetAccountsQuery, GetAccountsHandler } from './use-cases/queries';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountRepository, GetAccountsQuery, GetAccountsHandler],
})
export class AccountModule {}
