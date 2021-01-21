export interface IAccount {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  currencyId: number;
  amount: number;
}

export type INewAccount = Omit<IAccount, 'id' | 'payments'>;

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export enum PaymentType {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  accountId: number;
}

export type INewCategory = Omit<ICategory, 'id'>;

export interface ICurrency {
  id: number;
  name: string;
  createdAt: string;
}
