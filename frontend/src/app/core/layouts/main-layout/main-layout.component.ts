import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AccountState, IAccount } from '../../store';

@Component({
  selector: 'bg-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  constructor() {}

  ngOnInit(): void {}
}
