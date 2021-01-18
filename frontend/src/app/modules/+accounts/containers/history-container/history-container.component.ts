import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState, IAccount, ICategory, ICurrency } from '@core/store';

@Component({
  selector: 'bg-history-container',
  templateUrl: './history-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryContainerComponent {
  @Select(AccountState.currentAccount) public currentAccount$: Observable<IAccount>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
}
