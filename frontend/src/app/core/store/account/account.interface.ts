export interface IAccount {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  currencyId: number;
  amount: number;
}

export type INewAccount = Omit<IAccount, 'id' | 'payments'>;
