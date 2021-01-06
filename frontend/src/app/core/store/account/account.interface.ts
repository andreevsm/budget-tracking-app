export interface IAccount {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  currency: Currency;
  payments: IPayment[];
}

export type INewAccount = Omit<IAccount, 'id' | 'payments'>;

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export enum PaymentType {
  INCOME = 'incomes',
  EXPENSE = 'expenses',
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
}

export interface IPayment {
  id: number;
  accountId: number;
  amount: number;
  operationType: keyof typeof PaymentType;
  categoryId: number;
  createdAt: string;
  currency: keyof typeof Currency;
}

export type INewPayment = Omit<IPayment, 'id'>;
