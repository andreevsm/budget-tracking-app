import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountActions } from '@core/store';

@Component({
  selector: 'bg-account-layout',
  templateUrl: './account-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountLayoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
      this.store.dispatch(new AccountActions.LoadById(+id));
      this.store.dispatch(new AccountActions.LoadCategories(+id));
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
