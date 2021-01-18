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
import { getDay } from '@utils/helpers/get-day.helper';

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
  @Input() public accountsEntity: Record<number, IAccount> = {};

  @Output() public deleteTransaction = new EventEmitter<number>();

  public displayedColumns = ['category', 'amount', 'account', 'actions'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    console.log('transactions', this.transactions);
    console.log('accountsEntity', this.accountsEntity);

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
