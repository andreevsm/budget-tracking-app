import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AccountService } from './account.service';
import { AccountActions } from './account.action';
import { IAccount } from './account.interface';

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
  constructor(private accountService: AccountService) {}

  @Selector()
  public static accounts(state: IAccountState): IAccount[] {
    return state.accounts;
  }

  @Action(AccountActions.LoadAll)
  public loadAccounts({ setState, getState }: StateContext<IAccountState>): Observable<IAccount[]> {
    return this.accountService.loadAccounts().pipe(
      tap((accounts) =>
        setState({
          ...getState(),
          accounts,
        }),
      ),
    );
  }
}
