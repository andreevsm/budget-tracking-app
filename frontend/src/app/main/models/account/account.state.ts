import {Action, State, StateContext, Selector, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {UIActions} from '../../../core/store';

import {AccountService} from './account.service';
import {AccountActions} from './account.action';
import {IAccount} from './account.interface';

export interface IAccountState {
  accounts: IAccount[];
}

@State<IAccountState>({
  name: 'account',
  defaults: {
    accounts: [],
  },
})
@Injectable()
export class AccountState {
  constructor(private accountService: AccountService, private store: Store) {
  }

  @Selector()
  public static accounts(state: IAccountState): IAccount[] {
    return state.accounts;
  }

  @Action(AccountActions.LoadAll)
  public loadAccounts({setState, getState}: StateContext<IAccountState>): Observable<IAccount[]> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.loadAccounts().pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accounts,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AccountActions.Delete)
  public deleteAccount(
    {setState, getState}: StateContext<IAccountState>,
    {id}: AccountActions.Delete,
  ): Observable<IAccount[]> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.deleteAccount(id).pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accounts,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AccountActions.Create)
  public createAccount(
    {setState, getState}: StateContext<IAccountState>,
    {account}: AccountActions.Create,
  ): Observable<IAccount[]> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.createAccount(account).pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accounts,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AccountActions.Update)
  public editAccount(
    {setState, getState}: StateContext<IAccountState>,
    {account}: AccountActions.Create,
  ): Observable<IAccount[]> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.editAccount(account).pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accounts,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }
}
