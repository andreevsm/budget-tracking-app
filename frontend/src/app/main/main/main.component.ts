import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountState, AccountActions, IAccount } from '../models';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  public buttons = [
    {
      icon: 'edit',
      click: (account: IAccount): void => this.onEditAccount(account),
    },
    {
      icon: 'remove_red_eye',
      click: (account: IAccount): void => this.onViewAccount(account),
    },
    {
      icon: 'delete',
      click: (account: IAccount): void => this.onDeleteAccount(account),
    },
  ];

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
  }

  private onEditAccount(account: IAccount): void {
    console.log('edit', account);
  }

  private onViewAccount(account: IAccount): void {
    console.log('view', account);
  }

  private onDeleteAccount(account: IAccount): void {
    this.store.dispatch(new AccountActions.Delete(account.id));
  }
}
