import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { makeEntityByKey } from '@utils/helpers';

import { AccountService } from './account.service';
import { AccountActions } from './account.action';
import { IAccount } from './account.interface';

export interface IAccountState {
  accountsEntity: Record<number, IAccount>;
  currentAccount: IAccount;
}

@State<IAccountState>({
  name: 'account',
  defaults: {
    accountsEntity: {},
    currentAccount: null,
  },
})
@Injectable()
export class AccountState {
  constructor(private accountService: AccountService) {}

  @Selector()
  public static accounts(state: IAccountState): IAccount[] {
    return Object.values(state.accountsEntity);
  }

  @Selector()
  public static accountsEntity(state: IAccountState): Record<number, IAccount> {
    return state.accountsEntity;
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
}
