export namespace AccountActions {
  export class LoadAll {
    public static readonly type = '[Accounts] Load accounts';
  }

  export class Delete {
    public static readonly type = '[Accounts] Delete account';

    constructor(public id: number) {}
  }
}
