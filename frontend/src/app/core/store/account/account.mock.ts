import { IAccount, Currency, IPayment } from './account.interface';

export const PAYMENTS: IPayment[] = [
  {
    id: 1,
    category: {
      id: 1,
      name: 'Спорт',
      color: '#ffbf00',
    },
    amount: 500,
    currency: 'RUB',
    type: 'EXPENSE',
    createdAt: new Date('2019-04-20'),
  },
  {
    id: 2,
    category: {
      id: 2,
      name: 'Книги',
      color: '#00bfff',
    },
    amount: 1500,
    currency: 'RUB',
    type: 'EXPENSE',
    createdAt: new Date('2019-04-20'),
  },
  {
    id: 3,
    category: {
      id: 3,
      name: 'Работа',
      color: '#bf00ff',
    },
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
    createdAt: new Date('2019-04-20'),
    description: 'Это мой счет 1',
    currency: Currency.EUR,
    payments: PAYMENTS,
  },
];
