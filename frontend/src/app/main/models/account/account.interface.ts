export interface IAccount {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  currency: Currency; // поменять на тип валюты
  accountNumber: number;
  type: AccountType; // поменять на енам (обычный премиум и тд)
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
