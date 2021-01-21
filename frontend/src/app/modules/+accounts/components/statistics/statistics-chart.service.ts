/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData, ChartTooltipItem } from 'chart.js';

export interface IChartDatum {
  x: string;
  y: number;
}

@Injectable()
export class StatisticsChartService {
  private chart: Chart;

  public buildChart(element: HTMLCanvasElement, callback: (isCreated: boolean) => void): void {
    this.chart = new Chart(element, {
      type: 'line',
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
        tooltips: {
          callbacks: {
            label: (item: ChartTooltipItem, data: ChartData): string => {
              console.log(item);
              console.log(data);

              return `
                ${item.label}
                ${data.datasets.map((it) => (it.data as any).map((datum) => `${datum}`))}
              `;
            },
          },
        },
      },
    });

    console.log('chart', this.chart);

    callback(true); // изменить
  }

  public addLabels(labels: string[]): void {
    this.chart.data.labels?.push(...labels);

    this.chart.data.datasets.push();
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
