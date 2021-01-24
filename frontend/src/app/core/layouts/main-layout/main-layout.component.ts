import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';

import { AccountActions, AuthActions, TransactionActions } from '../../store';

@Component({
  selector: 'bg-main-layout',
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
    this.store.dispatch(new AccountActions.LoadCurrencies());
    this.store.dispatch(new TransactionActions.LoadAll());
  }

  public onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
