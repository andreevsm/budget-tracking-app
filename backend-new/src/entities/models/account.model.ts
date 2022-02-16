export interface IAccountModel {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: Date;
  currency_id: number;
  amount: number;
}
