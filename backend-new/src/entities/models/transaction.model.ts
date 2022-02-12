export interface ITransactionModel {
  id: number;
  account_income: number;
  account_outcome: number;
  income: number;
  outcome: number;
  comment: string;
  created_at: Date;
  user_id: number;
  category_id: number;
}
