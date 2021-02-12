export interface ICategory {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  userId: number;
}

export type INewCategory = Omit<ICategory, 'id' | 'userId'>;
