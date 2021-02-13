import { IAccount, INewAccount } from './account.interface';

export namespace AccountActions {
  export class LoadAll {
    public static readonly type = '[Accounts] Load accounts';
  }

  export class LoadById {
    public static readonly type = '[Accounts] Load By Id';
    constructor(public accountId: number) {}
  }

  export class Delete {
    public static readonly type = '[Accounts] Delete account';
    constructor(public id: number) {}
  }

  export class Create {
    public static readonly type = '[Accounts] Create account';
    constructor(public account: INewAccount) {}
  }

  export class Update {
    public static readonly type = '[Accounts] Update account';
    constructor(public account: IAccount) {}
  }
}
