import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  NgZone,
} from '@angular/core';
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

  multi = [
    {
      name: 'Транзакции',
      series: [
        {
          name: '1990',
          value: 62000000,
        },
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  public ngOnChanges(changes: NgChanges<StatisticsComponent>): void {
    if (changes.transactions?.previousValue !== changes.transactions?.currentValue) {
      this.prepareResults();
    }
  }

  public onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  public onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private prepareResults(): void {
    const lastDays = eachOfInterval(6);

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

    console.log('balance', balance);
  }

  // private buildChart(): void {
  //   console.log('chartElementRef', this.chartElementRef);

  //   this.chartService.buildChart(
  //     this.chartElementRef.nativeElement,
  //     this.tooltipElementRef.nativeElement,
  //     (isCreated) => {
  //       this.isCreated = isCreated;
  //       this.cdr.markForCheck();
  //     },
  //   );
  // }

  // private addDataToChart(): void {
  //   const lastDays = eachOfInterval(6);

  //   const balance = lastDays
  //     .map((day) => {
  //       return this.transactions.filter((transaction) =>
  //         isEqual(
  //           new Date(parseDateToString(new Date(transaction.createdAt))).getTime(),
  //           new Date(parseDateToString(day)).getTime(),
  //         ),
  //       );
  //     })
  //     .map((item) => {
  //       return item.reduce((prev, curr) => {
  //         if (curr.income === 0) {
  //           return prev + curr.outcome;
  //         }

  //         if (curr.outcome === 0) {
  //           return prev + curr.income;
  //         }
  //         return prev + curr.income;
  //       }, 0);
  //     });

  //   this.chartService.addLabels(lastDays.map((day) => day.toDateString()));
  //   this.chartService.addBlock({
  //     label: 'Баланс',
  //     data: balance,
  //   });
  // }
}
