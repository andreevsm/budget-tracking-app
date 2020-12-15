import {IAccount, AccountType, Currency} from './account.interface';

export const ACCOUNTS: IAccount[] = [
  {
    id: 1,
    name: 'Счет 1',
    createdAt: new Date('2019-04-20'),
    description: 'Это мой счет 1',
    currency: Currency.EUR,
    accountNumber: 1231312,
    type: AccountType.Free,
  },
  {
    id: 2,
    name: 'Счет 2',
    createdAt: new Date('2020-11-01'),
    description: 'Это мой счет 2',
    currency: Currency.RUB,
    accountNumber: 2524322,
    type: AccountType.Free,
  },
  {
    id: 3,
    name: 'Счет 1',
    createdAt: new Date('2020-08-17'),
    description: 'Это мой счет 1',
    currency: Currency.USD,
    accountNumber: 6365465,
    type: AccountType.Free,
  },
];
