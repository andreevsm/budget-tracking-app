import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { CreatePaymentComponent, CreateAccountComponent } from './modals';
import {
  AccountComponent,
  AccountsComponent,
  HistoryComponent,
  StatisticsComponent,
} from './components';
import { StatisticsContainerComponent } from './containers';
import { HistoryContainerComponent } from './containers/history-container/history-container.component';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { AccountsContainerComponent } from './containers/accounts-container/accounts-container.component';

@NgModule({
  declarations: [
    CreatePaymentComponent,
    AccountsComponent,
    AccountComponent,
    HistoryComponent,
    CreateAccountComponent,
    StatisticsContainerComponent,
    StatisticsComponent,
    HistoryContainerComponent,
    AccountContainerComponent,
    AccountsContainerComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
