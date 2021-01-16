import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { ICategory, ICurrency } from 'src/app/core/store';
import { getDay } from 'src/app/utils/helpers/get-day.helper';

import { ITransaction } from '../../store';

@Component({
  selector: 'bg-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryComponent implements OnInit, OnChanges {
  @Input() public transactions: (ITransaction | { grouped: any })[] = [];
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;

  public displayedColumns = ['category', 'amount', 'account'];

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    console.log('transactions', this.transactions);

    this.groupPaymentsByDay();
  }

  public isGroup(index: number, item: { grouped: any }): boolean {
    return Boolean(item.grouped?.key);
  }

  private groupPaymentsByDay(): void {
    const groupedTransactions: Record<string, ITransaction[]> = {};

    this.transactions
      .slice()
      .sort((first: ITransaction, second: ITransaction) => {
        const firstTime = new Date(first.createdAt).getTime();
        const secondTime = new Date(second.createdAt).getTime();

        return secondTime - firstTime;
      })
      .forEach((transaction: ITransaction) => {
        const date = transaction.createdAt.toString();

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (groupedTransactions[date]) {
          groupedTransactions[date] = [...groupedTransactions[date], transaction];
        } else {
          groupedTransactions[date] = [transaction];
        }
      });

    this.transactions = Object.entries(groupedTransactions)
      .map(([key, value]) => [
        {
          grouped: {
            key,
            day: getDay(new Date(key)),
          },
        },
        ...value,
      ])
      .flat();
  }
}