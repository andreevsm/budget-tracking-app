import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { TransactionsContainerComponent } from './containers/transactions-container/transactions-container.component';
import { TransactionsRoutingModule } from './transactions.routing';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { TransactionsFilterComponent } from './components/transactions-filter/transactions-filter.component';

@NgModule({
  declarations: [
    TransactionsContainerComponent,
    AddTransactionComponent,
    TransactionsHistoryComponent,
    TransactionsFilterComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class TransactionsModule {}
