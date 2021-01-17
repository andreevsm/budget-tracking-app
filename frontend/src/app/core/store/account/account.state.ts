import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, finalize, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { makeEntityByKey } from 'src/app/utils';

import { UIActions } from '../ui';

import { AccountService } from './account.service';
import { AccountActions } from './account.action';
import { IAccount, ICategory, ICurrency } from './account.interface';

export interface IAccountState {
  accountsEntity: Record<number, IAccount>;
  currentAccount: IAccount;
  categories: Record<number, ICategory>;
  currencies: Record<number, ICurrency>;
}

@State<IAccountState>({
  name: 'account',
  defaults: {
    accountsEntity: {},
    categories: {},
    currencies: {},
    currentAccount: null,
  },
})
@Injectable()
export class AccountState {
  constructor(private accountService: AccountService, private store: Store) {}

  @Selector()
  public static accounts(state: IAccountState): IAccount[] {
    return Object.values(state.accountsEntity);
  }

  @Selector()
  public static accountsEntity(state: IAccountState): Record<number, IAccount> {
    return state.accountsEntity;
  }

  @Selector()
  public static categories(state: IAccountState): Record<number, ICategory> {
    return state.categories;
  }

  @Selector()
  public static currencies(state: IAccountState): Record<number, ICurrency> {
    return state.currencies;
  }

  @Selector()
  public static currentAccount(state: IAccountState): IAccount {
    return state.currentAccount;
  }

  @Action(AccountActions.LoadAll)
  public loadAccounts({ setState, getState }: StateContext<IAccountState>): Observable<IAccount[]> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.loadAccounts().pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accountsEntity: makeEntityByKey(accounts, (account) => account.id),
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(AccountActions.LoadById)
  public loadById(
    { setState, getState }: StateContext<IAccountState>,
    { accountId }: AccountActions.LoadById,
  ): Observable<IAccount> {
    return forkJoin([
      this.accountService.loadAccountById(accountId),
      this.accountService.loadPayments(accountId),
    ]).pipe(
      map(([account, payments]) => ({
        ...account,
        payments,
      })),
      tap((currentAccount) =>
        setState({
          ...getState(),
          currentAccount,
        }),
      ),
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
  public loadCategories(
    { setState, getState }: StateContext<IAccountState>,
    { accountId }: AccountActions.LoadCategories,
  ): any {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.loadCategories(accountId).pipe(
      tap((categoryList) => {
        const categories = categoryList.reduce((acc, cur) => {
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

  @Action(AccountActions.LoadCurrencies)
  public loadCurrencies({ setState, getState }: StateContext<IAccountState>): any {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService.loadCurrencies().pipe(
      tap((currencyList) => {
        const currencies = currencyList.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

        setState({
          ...getState(),
          currencies,
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

  @Action(AccountActions.AddCategory)
  public addCategory(
    { setState, getState }: StateContext<IAccountState>,
    { category }: AccountActions.AddCategory,
  ): Observable<number> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return this.accountService
      .addCategory(category)
      .pipe(finalize(() => this.store.dispatch(new UIActions.HideSpinner())));
  }
}
