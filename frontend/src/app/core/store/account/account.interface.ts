export interface IAccount {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  currency: Currency; // поменять на тип валюты
  accountNumber: number;
  type: AccountType; // поменять на енам (обычный премиум и тд)
  payments: IPayment[];
}

export const enum AccountType {
  Free,
  Premium,
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export enum PaymentType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export interface IPayment {
  id: number;
  category: ICategory;
  amount: number;
  currency: keyof typeof Currency;
  type: keyof typeof PaymentType;
}

export type INewPayment = Omit<IPayment, 'id'>;
