import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { IPayment } from 'src/app/core/store';

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

  @Input() public payments: IPayment[];

  public chart: Chart;

  constructor(private chartService: StatisticsChartService) {}

  public ngAfterViewInit(): void {
    this.chart = this.chartService.buildChart(this.chartElementRef.nativeElement);
  }
}
