import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Navigate } from '@ngxs/router-plugin';
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

  @Action(AuthActions.SignIn)
  public login(
    { setState, getState }: StateContext<IAuthState>,
    { payload }: AuthActions.SignIn,
  ): Observable<IResponseUser | null> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.userService.login(payload).pipe(
      tap((response) => {
        if (response !== null) {
          setState({
            ...getState(),
            user: {
              ...getState().user,
              email: response.email,
            },
          });

          this.store.dispatch(new Navigate(['/accounts']));
        }
      }),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AuthActions.SignUp)
  public signUp(
    { setState, getState }: StateContext<IAuthState>,
    { payload }: AuthActions.SignUp,
  ): Observable<IResponseUser | null> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.userService.signUp(payload).pipe(
      tap((response) => {
        if (response !== null) {
          setState({
            ...getState(),
            user: {
              ...getState().user,
              email: response.email,
            },
          });

          this.store.dispatch(new Navigate(['/accounts']));
        }
      }),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AuthActions.Logout)
  public logout(): Observable<any> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.userService.logout().pipe(
      tap(() => {
        this.userService.clearStorage();
        this.store.dispatch(new Navigate(['/signin']));
      }),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }
}
