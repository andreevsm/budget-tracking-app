import { IAccount, INewPayment } from './account.interface';

export namespace AccountActions {
  export class LoadAll {
    public static readonly type = '[Accounts] Load accounts';
  }

  export class Delete {
    public static readonly type = '[Accounts] Delete account';

    constructor(public id: number) {}
  }

  export class Create {
    public static readonly type = '[Accounts] Create account';

    constructor(public account: IAccount) {}
  }

  export class Update {
    public static readonly type = '[Accounts] Update account';

    constructor(public account: IAccount) {}
  }

  export class AddPayment {
    public static readonly type = '[Accounts] Add payment';

    constructor(public payment: INewPayment) {}
  }
}
