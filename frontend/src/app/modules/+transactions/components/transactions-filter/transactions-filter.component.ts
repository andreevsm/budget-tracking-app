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
import { IAccount } from 'src/app/core/store';
import { NgChanges } from 'src/app/utils';

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
    console.log('accounts', this.accounts);

    if (changes.accounts) {
      this.calculateTotal();
    }
  }

  public onSelectionChange(item: MatSelectionListChange): void {
    const accountId = item.options[0].value;

    if (this.accountsIds.has(accountId)) {
      this.accountsIds.delete(accountId);
    } else {
      this.accountsIds.add(accountId);
    }

    this.filterChange.emit([...this.accountsIds] as number[]);
  }

  private calculateTotal(): void {
    this.totalAmount = this.accounts
      .filter((account) => account.amount > 0)
      .reduce((prev, curr) => prev + curr.amount, 0);

    this.debt = this.accounts
      .filter((account) => account.amount < 0)
      .reduce((prev, curr) => prev + curr.amount, 0);
  }
}
