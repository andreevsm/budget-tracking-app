import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { IAccount, ITransaction } from '@core/store';
import { Currencies } from '@fixtures/currencies';
import { NgChanges } from '@utils/types';

@Component({
  selector: 'bg-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFilterComponent implements OnInit, OnChanges {
  @Input() public accounts: IAccount[] = [];
  @Input() public transactions: ITransaction[] = [];

  @Output() public filterChange = new EventEmitter<number[]>();

  public totalAmount = 0;
  public debt = 0;

  private accountsIds = new Set();

  public ngOnInit(): void {}

  public ngOnChanges(changes: NgChanges<TransactionsFilterComponent>): void {
    if (changes.accounts || changes.transactions) {
      this.calculateTotal();
    }
  }

  public onSelectionChange(item: MatSelectionListChange): void {
    const accountId = item.option.value;

    if (this.accountsIds.has(accountId)) {
      this.accountsIds.delete(accountId);
    } else {
      this.accountsIds.add(accountId);
    }

    this.filterChange.emit([...this.accountsIds] as number[]);
  }

  private calculateTotal(): void {
    this.accounts.forEach(({ id }) => {
      this.accountsIds.add(id);
    });

    this.totalAmount = this.accounts.reduce((prev, curr) => {
      const result = this.transactions
        .filter((transaction) =>
          [transaction.accountIncome, transaction.accountOutcome].includes(curr.id),
        )
        .reduce((prevTrans, currTrans) => {
          if (currTrans.accountIncome === currTrans.accountOutcome) {
            return prevTrans + currTrans.income + currTrans.outcome;
          }

          if (currTrans.accountIncome === curr.id) {
            return prevTrans + currTrans.income;
          }

          if (currTrans.accountOutcome === curr.id) {
            return prevTrans + currTrans.outcome;
          }

          return prev;
        }, curr.amount);

      if (result < 0) {
        this.debt += result;
      }

      if (curr.currencyId === 1) {
        return prev + result * Currencies.USD;
      }

      if (curr.currencyId === 3) {
        return prev + result * Currencies.EURO;
      }

      return prev + result;
    }, 0);
  }
}
