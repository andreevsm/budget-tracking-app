import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountState, IAccount } from 'src/app/core/store';

@Component({
  selector: 'bg-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  public currentAccount$: Observable<IAccount>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.currentAccount$ = this.accounts$.pipe(
      map((accounts) => accounts.find((account) => account.id === 1) as IAccount),
      tap((data) => console.log('data', data)),
    );
  }
}
