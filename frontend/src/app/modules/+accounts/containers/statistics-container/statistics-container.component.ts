import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState, IAccount, ICategory, ICurrency } from '@core/store';

@Component({
  selector: 'bg-statistics-container',
  templateUrl: './statistics-container.component.html',
  styleUrls: ['./statistics-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsContainerComponent {
  @Select(AccountState.currentAccount) public currentAccount$: Observable<IAccount>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
}
