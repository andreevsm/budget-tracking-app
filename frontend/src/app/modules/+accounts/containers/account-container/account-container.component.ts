import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState, IAccount, ICategory, ICurrency } from 'src/app/core/store';

@Component({
  selector: 'bg-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountContainerComponent {
  @Select(AccountState.currentAccount) public currentAccount$: Observable<IAccount>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
}
