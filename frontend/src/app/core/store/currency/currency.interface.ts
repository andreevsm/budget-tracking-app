export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export interface ICurrency {
  id: number;
  name: string;
  createdAt: string;
}
