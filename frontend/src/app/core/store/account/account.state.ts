import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { makeEntityByKey } from '@utils/helpers';

import { AccountService } from './account.service';
import { AccountActions } from './account.action';
import { IAccount, ICategory, ICurrency } from './account.interface';

export interface IAccountState {
  accountsEntity: Record<number, IAccount>;
  currentAccount: IAccount;
  categoriesEntity: Record<number, ICategory>;
  currencies: Record<number, ICurrency>;
}

@State<IAccountState>({
  name: 'account',
  defaults: {
    accountsEntity: {},
    categoriesEntity: {},
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
    return state.categoriesEntity;
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
    return this.accountService.loadAccounts().pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accountsEntity: makeEntityByKey(accounts, (account) => account.id),
        }),
      ),
    );
  }

  @Action(AccountActions.LoadById)
  public loadById(
    { setState, getState }: StateContext<IAccountState>,
    { accountId }: AccountActions.LoadById,
  ): Observable<IAccount> {
    return this.accountService.loadAccountById(accountId).pipe(
      tap((currentAccount) =>
        setState({
          ...getState(),
          currentAccount,
        }),
      ),
    );
  }

  @Action(AccountActions.Delete)
  public deleteAccount(
    { setState, getState }: StateContext<IAccountState>,
    { id }: AccountActions.Delete,
  ): Observable<number> {
    return this.accountService.deleteAccount(id).pipe(
      tap(() => {
        const accountsEntity = { ...getState().accountsEntity };

        const accounts = Object.values(accountsEntity).filter((account) => account.id !== id);

        setState({
          ...getState(),
          accountsEntity: makeEntityByKey(accounts, (account) => account.id),
        });
      }),
    );
  }

  @Action(AccountActions.LoadCategories)
  public loadCategories({
    setState,
    getState,
  }: StateContext<IAccountState>): Observable<ICategory[]> {
    return this.accountService.loadCategories().pipe(
      tap((categories) => {
        const categoriesEntity = makeEntityByKey(categories, (category) => category.id);

        setState({
          ...getState(),
          categoriesEntity,
        });
      }),
    );
  }

  @Action(AccountActions.LoadCurrencies)
  public loadCurrencies({ setState, getState }: StateContext<IAccountState>): any {
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
    );
  }

  @Action(AccountActions.Create)
  public createAccount(
    { setState, getState }: StateContext<IAccountState>,
    { account }: AccountActions.Create,
  ): Observable<IAccount> {
    return this.accountService.createAccount(account).pipe(
      tap((newAccount) => {
        setState({
          ...getState(),
          accountsEntity: {
            ...getState().accountsEntity,
            [newAccount.id]: newAccount,
          },
        });
      }),
    );
  }

  @Action(AccountActions.Update)
  public updateAccount(
    { setState, getState }: StateContext<IAccountState>,
    { account }: AccountActions.Update,
  ): Observable<number> {
    return this.accountService.updateAccount(account).pipe(
      tap((success) => {
        if (success) {
          setState({
            ...getState(),
            accountsEntity: {
              ...getState().accountsEntity,
              [account.id]: account,
            },
          });
        }
      }),
    );
  }

  @Action(AccountActions.AddCategory)
  public addCategory(
    { setState, getState }: StateContext<IAccountState>,
    { category }: AccountActions.AddCategory,
  ): Observable<ICategory> {
    return this.accountService.addCategory(category).pipe(
      tap((newCategory) => {
        setState({
          ...getState(),
          categoriesEntity: {
            ...getState().categoriesEntity,
            [newCategory.id]: newCategory,
          },
        });
      }),
    );
  }
}
