import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AccountState, IAccount, IPayment } from 'src/app/core/store';

@Component({
  selector: 'bg-statistics-container',
  templateUrl: './statistics-container.component.html',
  styleUrls: ['./statistics-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsContainerComponent implements OnInit {
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
          filter((accounts) => accounts.length > 0),
          map((accounts) => accounts.find((account) => account.id === +id) as IAccount),
          map(({ payments }) => payments),
        ),
      ),
    );
  }
}
