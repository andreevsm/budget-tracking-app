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
import { IAccount } from '@core/store';
import { NgChanges } from '@utils/types';

@Component({
  selector: 'bg-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFilterComponent implements OnInit, OnChanges {
  @Input() public accounts: IAccount[] = [];

  @Output() public filterChange = new EventEmitter<number[]>();

  public totalAmount = 0;
  public debt = 0;

  private accountsIds = new Set();

  public ngOnInit(): void {}

  public ngOnChanges(changes: NgChanges<TransactionsFilterComponent>): void {
    if (changes.accounts) {
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

    this.totalAmount = this.accounts
      .filter((account) => account.amount > 0)
      .map(({ currencyId, amount }) => {
        if (currencyId === 1) {
          return amount * 73;
        }

        if (currencyId === 3) {
          return amount * 89;
        }

        return amount;
      })
      .reduce((prev, curr) => prev + curr, 0);

    this.debt = this.accounts
      .filter((account) => account.amount < 0)
      .map(({ currencyId, amount }) => {
        if (currencyId === 1) {
          return amount * 73;
        }

        if (currencyId === 3) {
          return amount * 89;
        }

        return amount;
      })
      .reduce((prev, curr) => prev + curr, 0);
  }
}
