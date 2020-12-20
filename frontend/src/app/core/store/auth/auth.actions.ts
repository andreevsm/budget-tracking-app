import { IRequestUser } from './auth.interface';

export namespace AuthActions {
  export class Load {
    public static readonly type = '[Auth] Load';
  }

  export class Login {
    public static readonly type = '[Auth] Login';

    constructor(public payload: IRequestUser) {}
  }
}
