import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

export interface IChartDatum {
  x: string;
  y: number;
}

@Injectable()
export class StatisticsChartService {
  private chart: Chart;

  public buildChart(element: HTMLCanvasElement, callback: (isCreated: boolean) => void): void {
    this.chart = new Chart(element, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        events: ['click'], // для оптимизации
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        responsive: true,
        devicePixelRatio: 2, // поменять на глобальную переменную
      },
    });

    console.log('chart', this.chart);

    callback(true); // изменить
  }

  public addLabels(labels: string[]): void {
    this.chart.data.labels?.push(...labels);

    this.update();
  }

  public addBlock(block: Chart.ChartDataSets): void {
    this.chart.data.datasets?.push(block);

    this.update();
  }

  private update(): void {
    this.chart.update();
  }
}
