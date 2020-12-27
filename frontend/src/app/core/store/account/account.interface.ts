export interface IAccount {
  id: number;
  createdAt: Date;
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
  createdAt: Date;
}

export type INewPayment = Omit<IPayment, 'id'>;
