import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UIActions } from '../ui';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { IRequestUser, IUser } from './auth.interface';

interface IAuthState {
  user: IUser;
}

@State<IAuthState>({
  name: 'user',
  defaults: {
    user: {
      email: '',
      login: '',
      role: '',
      status: '',
    },
  },
})
@Injectable()
export class AuthState {
  constructor(private userService: AuthService, private store: Store) {}

  @Selector()
  public static user(state: IAuthState): IUser {
    return state.user;
  }

  @Action(AuthActions.Login)
  public login(
    { setState, getState }: StateContext<IAuthState>,
    payload: IRequestUser,
  ): Observable<IUser> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.userService.login(payload).pipe(
      tap((user) =>
        setState({
          ...getState(),
          user,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }
}
