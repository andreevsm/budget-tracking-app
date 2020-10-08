export interface IExpense {
  id: number;
  date: Date;
  amount: number;
  currency: string; // поменять
  categoryId: number;
}
