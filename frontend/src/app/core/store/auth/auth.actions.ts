import { IRequestNewUser, IRequestUser } from './auth.interface';

export namespace AuthActions {
  export class Load {
    public static readonly type = '[Auth] Load';
  }

  export class Login {
    public static readonly type = '[Auth] Login';

    constructor(public payload: IRequestUser) {}
  }

  export class SignUp {
    public static readonly type = '[Auth] Sign Up';

    constructor(public payload: IRequestNewUser) {}
  }

  export class Logout {
    public static readonly type = '[Auth] Logout';
  }
}
