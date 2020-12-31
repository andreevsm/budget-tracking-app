import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap, filter, startWith, tap } from 'rxjs/operators';
import { AccountState, IAccount, IPayment } from 'src/app/core/store';

@Component({
  selector: 'bg-history-container',
  templateUrl: './history-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryContainerComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  public accountId$: Observable<number>;
  public payments$: Observable<IPayment[]>;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.payments$ = this.activatedRoute.params.pipe(
      map(({ id }) => +id),
      switchMap((id) =>
        this.accounts$.pipe(
          tap((data) => console.log('1', data)),
          filter((accounts) => accounts.length > 0),
          map((accounts) => accounts.find((account) => account.id === +id) as IAccount),
          tap((data) => console.log('2', data)),
          map(({ payments }) => payments),
        ),
      ),
    );
  }
}
