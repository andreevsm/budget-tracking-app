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

@NgModule({
  declarations: [
    CreatePaymentComponent,
    AccountsComponent,
    AccountComponent,
    HistoryComponent,
    CreateAccountComponent,
    StatisticsContainerComponent,
    StatisticsComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
