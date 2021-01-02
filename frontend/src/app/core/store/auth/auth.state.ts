import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UIActions } from '../ui';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { IResponseUser, IUser } from './auth.interface';

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
    { payload }: AuthActions.Login,
  ): Observable<IResponseUser | null> {
    this.store.dispatch(new UIActions.ShowSpinner());

    console.log('1', payload);

    const { email, password } = payload;

    return this.userService
      .login({
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response !== null) {
            setState({
              ...getState(),
              user: {
                ...getState().user,
                email: response.email,
              },
            });
          }
        }),
        finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
      );
  }
}
