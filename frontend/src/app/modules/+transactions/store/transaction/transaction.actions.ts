import { INewTransaction } from './transaction.interface';

export namespace TransactionActions {
  export class LoadAll {
    public static readonly type = '[Transaction] Load All';
  }

  export class Add {
    public static readonly type = '[Transaction] Add';

    constructor(public transaction: INewTransaction) {}
  }
}
