import { IPayment, CurrencyPayment } from './payment.interface';

export const PAYMENTS: IPayment[] = [
  {
    id: 1,
    amount: 100,
    categoryId: 1,
    createdAt: new Date('2019-04-20'),
    currency: CurrencyPayment.RUB,
  },
  {
    id: 2,
    amount: 4500,
    categoryId: 1,
    createdAt: new Date('2020-08-17'),
    currency: CurrencyPayment.RUB,
  },
  {
    id: 3,
    amount: 39000,
    categoryId: 1,
    createdAt: new Date('2020-11-01'),
    currency: CurrencyPayment.RUB,
  },
];
