import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { IAccount, ICategory, ICurrency, ITransaction } from '@core/store';
import { eachOfInterval } from '@fixtures/last-days';
import { getDay, parseDateToString, parseDateToUIString } from '@utils/helpers';

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

      const result =
        prev +
        this.transactions
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

            if (currTrans.outcome === 0) {
              return prevTrans + currTrans.income;
            }

            if (currTrans.income === 0) {
              return prevTrans + currTrans.outcome;
            }

            return prev;
          }, initialValue);

      if (curr.currencyId === 1) {
        return result * 73;
      }

      if (curr.currencyId === 3) {
        return result * 89;
      }

      return result;
    }, 0);
  }

  private prepareResults(): void {
    if (!(this.accounts instanceof Array)) {
      return;
    }

    const lastDays = eachOfInterval(10);

    const totalAmount = lastDays.map((day) => {
      return this.accounts.reduce((prev, curr) => {
        const initialValue =
          new Date(parseDateToString(new Date(curr.createdAt))).getTime() ===
          new Date(parseDateToString(day)).getTime()
            ? curr.amount
            : 0;

        const result =
          prev +
          this.transactions
            .filter(
              (transaction) =>
                new Date(parseDateToString(new Date(transaction.createdAt))).getTime() <=
                  new Date(parseDateToString(day)).getTime() &&
                [transaction.accountIncome, transaction.accountOutcome].includes(curr.id),
            )
            .reduce((prevTrans, currTrans) => {
              if (currTrans.accountIncome === currTrans.accountOutcome) {
                return prevTrans + currTrans.income + currTrans.outcome;
              }

              if (currTrans.outcome === 0) {
                return prevTrans + currTrans.income;
              }

              if (currTrans.income === 0) {
                return prevTrans + currTrans.outcome;
              }

              return prev;
            }, initialValue);

        if (curr.currencyId === 1) {
          return result * 73;
        }

        if (curr.currencyId === 3) {
          return result * 89;
        }

        return result;
      }, 0);
    });

    console.log('totalAmount', totalAmount);

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
