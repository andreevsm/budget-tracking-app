import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
  public transform(array: any[], field: string): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return array.map((item) => item[field]).reduce((prev, curr) => prev + curr, 0);
  }
}
