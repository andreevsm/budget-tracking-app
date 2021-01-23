export interface ITransaction {
  id: number;
  accountIncome: number;
  accountOutcome: number;
  income: number;
  outcome: number;
  comment: string;
  createdAt: Date;
  categoryId: number;
}

export type INewTransaction = Omit<ITransaction, 'id'>;
