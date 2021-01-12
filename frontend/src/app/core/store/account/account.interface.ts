export interface IAccount {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  currencyId: number;
  amount: number;
  payments: IPayment[];
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
}

export type INewCategory = Omit<ICategory, 'id'>;

export interface IPayment {
  id: number;
  accountId: number;
  amount: number;
  operationType: PaymentType;
  categoryId: number;
  createdAt: string;
  currencyId: number;
}

export type INewPayment = Omit<IPayment, 'id'>;

export interface ICurrency {
  id: number;
  name: string;
  createdAt: string;
}
