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

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
  }
}
