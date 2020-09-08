export interface IPayment {
  id: number;
  currency: CurrencyPayment;
  categoryId: number;
  amount: number;
  createdAt: Date;
}

export enum CurrencyPayment {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export interface ICategory {
  id: number;
  name: string;
}
