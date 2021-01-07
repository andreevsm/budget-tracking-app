import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AccountActions, AccountState, AuthActions, IAccount } from '../../store';

@Component({
  selector: 'bg-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  public isSidenavShown = false;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
    this.store.dispatch(new AccountActions.LoadCategories());
    this.store.dispatch(new AccountActions.LoadCurrencies());
  }

  public onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
