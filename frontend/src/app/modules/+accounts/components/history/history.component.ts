import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { getMonth } from 'date-fns';
import { IPayment } from 'src/app/core/store';
import { MONTHS } from 'src/app/fixtures';

@Component({
  selector: 'bg-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, OnChanges {
  @Input() public payments: any[] = [];

  public displayedColumns = ['category', 'amount'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    this.groupPaymentsByDay();
    console.log('payments', this.payments);
  }

  public isGroup(index: number, item: any): boolean {
    return item.grouped;
  }

  private groupPaymentsByDay(): any {
    // const groupedPaymentsByMonths = MONTHS.map((month, index) => {
    //   return this.payments.filter(({ createdAt }) => getMonth(createdAt) === index);
    // });

    const groupedPayments: Record<string, IPayment[]> = {};

    this.payments.forEach((payment) => {
      const date = payment.createdAt.toString();

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (groupedPayments[date]) {
        groupedPayments[date] = [...groupedPayments[date], payment];
      } else {
        groupedPayments[date] = [payment];
      }
    });

    this.payments = Object.entries(groupedPayments)
      .map(([key, value]) => {
        return [
          {
            grouped: key,
          },
          ...value,
        ];
      })
      .flat();
  }
}
