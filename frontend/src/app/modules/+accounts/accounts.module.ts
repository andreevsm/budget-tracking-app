import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {MainRoutingModule} from './accounts.routing';
import {EditAccountComponent} from './modals/edit-account/edit-account.component';
import { CreatePaymentComponent } from './modals/create-payment/create-payment.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [EditAccountComponent, CreatePaymentComponent, AccountsComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {
}
