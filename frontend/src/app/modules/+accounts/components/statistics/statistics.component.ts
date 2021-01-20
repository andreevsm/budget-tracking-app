import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { getMonth, subDays, eachDayOfInterval, isEqual } from 'date-fns';
import { IAccount, ICategory, ICurrency, IPayment, ITransaction, PaymentType } from '@core/store';
import { MONTHS } from '@fixtures/months';
import { ChartPoint } from 'chart.js';
import { eachOfInterval } from '@fixtures/last-days';
import { parseDateToString } from '@utils/helpers';

import { StatisticsChartService } from './statistics-chart.service';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StatisticsChartService],
})
export class StatisticsComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') public chartElementRef: ElementRef<HTMLCanvasElement>;

  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;
  @Input() public accounts: IAccount[];
  @Input() public transactions: ITransaction[];

  public chart: Chart;
  public isCreated = false;

  constructor(private chartService: StatisticsChartService, private cdr: ChangeDetectorRef) {}

  public ngOnChanges(): void {
    if (this.chartElementRef) {
      this.buildChart();
    }
  }

  public ngAfterViewInit(): void {
    this.buildChart();
  }

  // private groupPaymentsByMonths(): IPayment[][] {
  //   return MONTHS.map((month, index) => {
  //     return this.payments.filter(({ createdAt }) => getMonth(new Date(createdAt)) === index);
  //   });
  // }

  private buildChart(): void {
    console.log('transactions', this.transactions);

    this.chartService.buildChart(this.chartElementRef.nativeElement, (isCreated) => {
      this.isCreated = isCreated;
      this.cdr.markForCheck();
    });

    const lastDays = eachOfInterval(6);

    console.log(lastDays);

    // console.log(this.groupPaymentsByMonths());

    // const groupedPayments = this.groupPaymentsByMonths();

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

    console.log('balance', balance);

    // const expenses = groupedPayments.map((payments) =>
    //   payments.reduce(
    //     (prev, curr) => (curr.operationType === PaymentType.EXPENSES ? prev + curr.amount : prev),
    //     0,
    //   ),
    // );

    // const incomes = groupedPayments.map((payments) =>
    //   payments.reduce(
    //     (prev, curr) => (curr.operationType === PaymentType.INCOMES ? prev + curr.amount : prev),
    //     0,
    //   ),
    // );

    this.chartService.addLabels(lastDays.map((day) => day.toDateString()));
    this.chartService.addBlock({
      label: 'Баланс',
      data: balance,
    });
  }
}
