import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { IAccount, ICategory, ICurrency, ITransaction } from '@core/store';
import { getDay, parseDateToString, parseDateToUIString, eachOfInterval } from '@utils/helpers';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnChanges {
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;
  @Input() public accounts: IAccount[] = [];
  @Input() public accountsEntity: Record<number, IAccount>;
  @Input() public transactions: ITransaction[] = [];

  public view: number[] = [800, 400];
  public results = [];
  public colorScheme = {
    domain: ['#673ab7'],
  };
  public daysRange = 9;

  public yAxisTickFormatting = (value: number) => `${value} руб.`;

  public ngOnChanges(): void {
    this.prepareResults();
  }

  public getTransactionsByDate(date: Date): ITransaction[] {
    return this.transactions.filter(
      (transaction) =>
        new Date(parseDateToString(new Date(transaction.createdAt))).getTime() ===
        new Date(parseDateToString(date)).getTime(),
    );
  }

  public getDate(date: Date): string {
    return `${getDay(date)}, ${parseDateToUIString(date)}`;
  }

  public getBalanceByDate(date: Date): number {
    return this.accounts.reduce((prev, curr) => {
      const initialValue =
        new Date(parseDateToString(new Date(curr.createdAt))).getTime() <=
        new Date(parseDateToString(date)).getTime()
          ? curr.amount
          : 0;

      const result = this.transactions
        .filter(
          (transaction) =>
            new Date(parseDateToString(new Date(transaction.createdAt))).getTime() <=
              new Date(parseDateToString(date)).getTime() &&
            [transaction.accountIncome, transaction.accountOutcome].includes(curr.id),
        )
        .reduce((prevTrans, currTrans) => {
          if (currTrans.accountIncome === currTrans.accountOutcome) {
            return prevTrans + currTrans.income + currTrans.outcome;
          }

          if (currTrans.accountIncome === curr.id && currTrans.accountOutcome !== curr.id) {
            return prevTrans + currTrans.income;
          }

          if (currTrans.accountIncome !== curr.id && currTrans.accountOutcome === curr.id) {
            return prevTrans + currTrans.outcome;
          }

          return prev;
        }, initialValue);

      if (curr.currencyId === 1) {
        return prev + result * 73;
      }

      if (curr.currencyId === 3) {
        return prev + result * 89;
      }

      return prev + result;
    }, 0);
  }

  private prepareResults(): void {
    if (!(this.accounts instanceof Array)) {
      return;
    }

    const lastDays = eachOfInterval(this.daysRange);

    const totalAmount = lastDays.map((day) => {
      return this.accounts.reduce((prev, curr) => {
        const initialValue =
          new Date(parseDateToString(new Date(curr.createdAt))).getTime() ===
          new Date(parseDateToString(day)).getTime()
            ? curr.amount
            : 0;

        const filteredTransactions = this.transactions.filter(
          (transaction) =>
            new Date(parseDateToString(new Date(transaction.createdAt))).getTime() <=
              new Date(parseDateToString(day)).getTime() &&
            [transaction.accountIncome, transaction.accountOutcome].includes(curr.id),
        );

        const result = filteredTransactions.reduce((prevTrans, currTrans) => {
          if (currTrans.accountIncome === currTrans.accountOutcome) {
            return prevTrans + currTrans.income + currTrans.outcome;
          }

          if (currTrans.accountIncome === curr.id && currTrans.accountOutcome !== curr.id) {
            return prevTrans + currTrans.income;
          }

          if (currTrans.accountIncome !== curr.id && currTrans.accountOutcome === curr.id) {
            return prevTrans + currTrans.outcome;
          }

          return prev;
        }, initialValue);

        if (curr.currencyId === 1) {
          return prev + result * 73;
        }

        if (curr.currencyId === 3) {
          return prev + result * 89;
        }

        return prev + result;
      }, 0);
    });

    this.results = [
      {
        name: 'Транзакции',
        series: lastDays.map((day, i) => ({
          name: day,
          value: totalAmount[i],
        })),
      },
    ];
  }
}
