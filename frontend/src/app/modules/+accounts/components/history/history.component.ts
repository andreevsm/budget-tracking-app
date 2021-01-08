import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { ICategory, ICurrency, IPayment } from 'src/app/core/store';

@Component({
  selector: 'bg-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnChanges {
  @Input() public payments: (IPayment | { grouped: string })[] = [];
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;

  public displayedColumns = ['category', 'amount'];

  public ngOnChanges(): void {
    this.groupPaymentsByDay();
  }

  public isGroup(index: number, item: { grouped: string }): boolean {
    return Boolean(item.grouped);
  }

  private groupPaymentsByDay(): any {
    const groupedPayments: Record<string, IPayment[]> = {};

    this.payments
      .slice()
      .sort((first: IPayment, second: IPayment) => {
        const firstTime = new Date(first.createdAt).getTime();
        const secondTime = new Date(second.createdAt).getTime();

        return secondTime - firstTime;
      })
      .forEach((payment: IPayment) => {
        const date = payment.createdAt.toString();

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (groupedPayments[date]) {
          groupedPayments[date] = [...groupedPayments[date], payment];
        } else {
          groupedPayments[date] = [payment];
        }
      });

    this.payments = Object.entries(groupedPayments)
      .map(([key, value]) => [{ grouped: key }, ...value])
      .flat();
  }
}
