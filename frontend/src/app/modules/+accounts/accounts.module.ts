import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { CreatePaymentComponent, CreateAccountComponent } from './modals';
import { AccountComponent, HistoryComponent, StatisticsComponent } from './components';
import {
  StatisticsContainerComponent,
  HistoryContainerComponent,
  AccountContainerComponent,
  AccountsContainerComponent,
} from './containers';
import { AccountLayoutComponent } from './layouts';

@NgModule({
  declarations: [
    CreatePaymentComponent,
    AccountComponent,
    HistoryComponent,
    CreateAccountComponent,
    StatisticsContainerComponent,
    StatisticsComponent,
    HistoryContainerComponent,
    AccountContainerComponent,
    AccountsContainerComponent,
    AccountLayoutComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule, MatSelectModule, FormsModule],
})
export class MainModule {}
