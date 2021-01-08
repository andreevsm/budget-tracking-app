import { IAccount, IPayment, PaymentType } from './account.interface';

export const PAYMENTS: IPayment[] = [
  {
    id: 1,
    accountId: 1,
    categoryId: 1,
    amount: 500,
    currencyId: 2,
    operationType: PaymentType.EXPENSES,
    createdAt: '2019-04-20',
  },
  {
    id: 2,
    accountId: 1,
    categoryId: 2,
    amount: 1500,
    currencyId: 2,
    operationType: PaymentType.EXPENSES,
    createdAt: '2019-04-20',
  },
  {
    id: 3,
    accountId: 1,
    categoryId: 3,
    amount: 500,
    currencyId: 2,
    operationType: PaymentType.INCOMES,
    createdAt: '2019-04-20',
  },
];

export const ACCOUNTS: IAccount[] = [
  {
    id: 1,
    name: 'Счет 1',
    createdAt: '2019-04-20',
    description: 'Это мой счет 1',
    currencyId: 2,
    payments: PAYMENTS,
  },
];
