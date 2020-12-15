import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Action, State, StateContext, Selector, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

import {UIActions} from '../ui';

import {UserService} from './user.service';
import {UserActions} from './user.actions';
import {IUser} from './user.interface';

interface IUserState {
  user: IUser;
}

@State<IUserState>({
  name: 'user',
  defaults: {
    user: {
      email: '',
      name: '',
    },
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService, private store: Store) {
  }

  @Selector()
  public static user(state: IUserState): IUser {
    return state.user;
  }

  @Action(UserActions.Load)
  public load({setState, getState}: StateContext<IUserState>): Observable<IUser> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.userService.load().pipe(
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
