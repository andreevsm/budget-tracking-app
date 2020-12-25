import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { CreatePaymentComponent, CreateAccountComponent } from './modals';
import { AccountComponent, AccountsComponent, HistoryComponent } from './components';

@NgModule({
  declarations: [
    CreatePaymentComponent,
    AccountsComponent,
    AccountComponent,
    HistoryComponent,
    CreateAccountComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
