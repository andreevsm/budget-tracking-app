import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { getMonth } from 'date-fns';
import { IAccount, ICategory, ICurrency, IPayment, ITransaction, PaymentType } from '@core/store';
import { MONTHS } from '@fixtures/months';

import { StatisticsChartService } from './statistics-chart.service';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StatisticsChartService],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chart') public chartElementRef: ElementRef<HTMLCanvasElement>;

  @Input() public payments: IPayment[] = [];
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;
  @Input() public accounts: IAccount[];
  @Input() public transactions: ITransaction[];

  public chart: Chart;
  public isCreated = false;

  constructor(private chartService: StatisticsChartService, private cdr: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    console.log('payments', this.payments);
    this.buildChart();
  }

  private groupPaymentsByMonths(): IPayment[][] {
    return MONTHS.map((month, index) => {
      return this.payments.filter(({ createdAt }) => getMonth(new Date(createdAt)) === index);
    });
  }

  private buildChart(): void {
    this.chartService.buildChart(this.chartElementRef.nativeElement, (isCreated) => {
      this.isCreated = isCreated;
      this.cdr.markForCheck();
    });

    console.log(this.groupPaymentsByMonths());

    const groupedPayments = this.groupPaymentsByMonths();

    const expenses = groupedPayments.map((payments) =>
      payments.reduce(
        (prev, curr) => (curr.operationType === PaymentType.EXPENSES ? prev + curr.amount : prev),
        0,
      ),
    );

    const incomes = groupedPayments.map((payments) =>
      payments.reduce(
        (prev, curr) => (curr.operationType === PaymentType.INCOMES ? prev + curr.amount : prev),
        0,
      ),
    );

    this.chartService.addLabels(MONTHS);
    this.chartService.addBlock({
      label: 'История расходов',
      data: expenses,
      backgroundColor: 'red',
    });

    this.chartService.addBlock({
      label: 'История доходов',
      data: incomes,
      backgroundColor: 'green',
    });
  }
}
