import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { IAccount, ICategory, ICurrency, ITransaction } from '@core/store';
import { parseDateToString, parseDateToUIString } from '@utils/helpers';
import { getDay } from '@utils/helpers/get-day.helper';

@Component({
  selector: 'bg-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryComponent implements OnInit, OnChanges {
  @Input() public transactions: ITransaction[] = [];
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;
  @Input() public accountsEntity: Record<number, IAccount>;

  @Output() public deleteTransaction = new EventEmitter<number>();

  public groupedTransactions: (ITransaction | { grouped: { key: string; day: string } })[] = [];
  public displayedColumns = ['category', 'amount', 'account', 'actions'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
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
        const date = parseDateToString(new Date(transaction.createdAt));

        if (groupedTransactions[date]) {
          groupedTransactions[date] = [...groupedTransactions[date], transaction];
        } else {
          groupedTransactions[date] = [transaction];
        }
      });

    this.groupedTransactions = Object.entries(groupedTransactions)
      .map(([key, value]) => [
        {
          grouped: {
            key: parseDateToUIString(new Date(key)),
            day: getDay(new Date(key)),
          },
        },
        ...value,
      ])
      .flat();
  }
}
