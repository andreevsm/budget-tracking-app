import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bg-statistics-container',
  templateUrl: './statistics-container.component.html',
  styleUrls: ['./statistics-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsContainerComponent implements OnInit {
  public accountId$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.accountId$ = this.activatedRoute.params.pipe(map(({ id }) => +id));
  }
}
