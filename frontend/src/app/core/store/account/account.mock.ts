import { IAccount, Currency, IPayment } from './account.interface';

export const PAYMENTS: IPayment[] = [
  {
    id: 1,
    categoryId: 1,
    amount: 500,
    currency: 'RUB',
    type: 'EXPENSE',
    createdAt: new Date('2019-04-20'),
  },
  {
    id: 2,
    categoryId: 2,
    amount: 1500,
    currency: 'RUB',
    type: 'EXPENSE',
    createdAt: new Date('2019-04-20'),
  },
  {
    id: 3,
    categoryId: 3,
    amount: 500,
    currency: 'RUB',
    type: 'INCOME',
    createdAt: new Date('2019-04-20'),
  },
];

export const ACCOUNTS: IAccount[] = [
  {
    id: 1,
    name: 'Счет 1',
    createdAt: '2019-04-20',
    description: 'Это мой счет 1',
    currency: Currency.EUR,
    payments: PAYMENTS,
  },
];
