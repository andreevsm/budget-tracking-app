import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { EditAccountComponent } from './modals/edit-account/edit-account.component';
import { CreatePaymentComponent } from './modals/create-payment/create-payment.component';
import { AccountComponent, AccountsComponent, HistoryComponent } from './components';

@NgModule({
  declarations: [
    EditAccountComponent,
    CreatePaymentComponent,
    AccountsComponent,
    AccountComponent,
    HistoryComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
