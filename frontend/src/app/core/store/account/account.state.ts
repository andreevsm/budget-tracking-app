import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UIActions } from '../ui';

import { AccountService } from './account.service';
import { AccountActions } from './account.action';
import { IAccount, ICategory } from './account.interface';

export interface IAccountState {
  accounts: IAccount[];
  categories: Record<number, ICategory>;
}

@State<IAccountState>({
  name: 'account',
  defaults: {
    accounts: [],
    categories: {},
  },
})
@Injectable()
export class AccountState {
  constructor(private accountService: AccountService, private store: Store) {}

  @Selector()
  public static accounts(state: IAccountState): IAccount[] {
    return state.accounts;
  }

  @Selector()
  public static categories(state: IAccountState): Record<number, ICategory> {
    return state.categories;
  }

  @Selector()
  public static currentAccount(state: IAccountState): (id: number) => IAccount {
    return (id: number): IAccount =>
      state.accounts.find((account) => account.id === id) as IAccount;
  }

  @Action(AccountActions.LoadAll)
  public loadAccounts({ setState, getState }: StateContext<IAccountState>): Observable<IAccount[]> {
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

  @Action(AccountActions.LoadPayments)
  public loadPayments({ setState, getState }: StateContext<IAccountState>, payload: number): any {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService
      .loadPayments(payload)
      .pipe(finalize(() => this.store.dispatch(new UIActions.HideSpinner())));
  }

  @Action(AccountActions.LoadCategories)
  public loadCategories({ setState, getState }: StateContext<IAccountState>): any {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.loadCategories().pipe(
      tap((categoryList) => {
        const categories = categoryList.reduce((acc, cur, i) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

        setState({
          ...getState(),
          categories,
        });
      }),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AccountActions.Create)
  public createAccount(
    { setState, getState }: StateContext<IAccountState>,
    { account }: AccountActions.Create,
  ): Observable<number> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService
      .createAccount(account)
      .pipe(finalize(() => this.store.dispatch(new UIActions.HideSpinner())));
  }

  @Action(AccountActions.AddPayment)
  public addPayment(
    { setState, getState }: StateContext<IAccountState>,
    { payment }: AccountActions.AddPayment,
  ): Observable<number> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService
      .addPayment(payment)
      .pipe(finalize(() => this.store.dispatch(new UIActions.HideSpinner())));
  }
}
