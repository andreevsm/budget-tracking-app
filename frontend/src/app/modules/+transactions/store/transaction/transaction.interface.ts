export interface ITransaction {
  id: number;
  accountIncome: number;
  accountOutcome: number;
  income: number;
  outcome: number;
  comment: string;
  createdAt: string;
}

export type INewTransaction = Omit<ITransaction, 'id'>;