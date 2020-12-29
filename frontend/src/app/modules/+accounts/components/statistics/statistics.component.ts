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
import { IPayment } from 'src/app/core/store';
import { MONTHS, MONTH_LIST } from 'src/app/fixtures';

import { IChartDatum, StatisticsChartService } from './statistics-chart.service';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StatisticsChartService],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chart') public chartElementRef: ElementRef<HTMLCanvasElement>;

  @Input() public payments: IPayment[];

  public chart: Chart;
  public isCreated = false;

  constructor(private chartService: StatisticsChartService, private cdr: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    console.log('payments', this.payments);
    this.buildChart();
  }

  private parsePaymentsToDataChart(): IChartDatum[] {
    return this.payments.map(({ createdAt, amount }) => ({
      x: MONTH_LIST[getMonth(createdAt)],
      y: amount,
    }));
  }

  private buildChart(): void {
    this.chartService.buildChart(this.chartElementRef.nativeElement, (isCreated) => {
      this.isCreated = isCreated;
    });

    this.chartService.addLabels(MONTH_LIST);
    this.chartService.addBlock({
      label: 'История расходов',
      data: this.payments.filter(({ type }) => type === 'EXPENSE').map(({ amount }) => amount),
      backgroundColor: 'red',
    });

    this.chartService.addBlock({
      label: 'История доходов',
      data: this.payments.filter(({ type }) => type === 'INCOME').map(({ amount }) => amount),
      backgroundColor: 'green',
    });
  }
}
