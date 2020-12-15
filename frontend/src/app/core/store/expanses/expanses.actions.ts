import {IExpense} from './expanses.interface';

export namespace ExpansesActions {
  export class LoadAll {
    public static readonly type = '[Expanses] Load expanses';
  }

  export class Add {
    public static readonly type = '[Expanses] Add expanses';

    constructor(public expense: IExpense) {
    }
  }
}
