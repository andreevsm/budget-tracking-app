import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { IAccount, ICategory, ICurrency, ITransaction } from '@core/store';
import { eachOfInterval } from '@fixtures/last-days';
import { parseDateToString } from '@utils/helpers';
import { NgChanges } from '@utils/types';
import { isEqual } from 'date-fns';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnChanges {
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;
  @Input() public accounts: IAccount[];
  @Input() public transactions: ITransaction[];

  public view: number[] = [800, 400];
  public results = [];

  public ngOnChanges(changes: NgChanges<StatisticsComponent>): void {
    if (changes.transactions?.previousValue !== changes.transactions?.currentValue) {
      this.prepareResults();
    }
  }

  private prepareResults(): void {
    const lastDays = eachOfInterval(30);

    const balance = lastDays
      .map((day) => {
        return this.transactions.filter((transaction) =>
          isEqual(
            new Date(parseDateToString(new Date(transaction.createdAt))).getTime(),
            new Date(parseDateToString(day)).getTime(),
          ),
        );
      })
      .map((item) => {
        return item.reduce((prev, curr) => {
          if (curr.income === 0) {
            return prev + curr.outcome;
          }

          if (curr.outcome === 0) {
            return prev + curr.income;
          }
          return prev + curr.income;
        }, 0);
      });

    this.results = [
      {
        name: 'Транзакции',
        series: lastDays.map((day, i) => ({
          name: day,
          value: balance[i],
        })),
      },
    ];
  }
}
