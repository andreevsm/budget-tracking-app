import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';

import {SharedModule} from '../shared/shared.module';

import {AccountState, AccountService} from './models';
import {MainRoutingModule} from './main.routing';
import {MainComponent} from './main/main.component';
import {EditAccountComponent} from './modals/edit-account/edit-account.component';
import { CreatePaymentComponent } from './modals/create-payment/create-payment.component';

@NgModule({
  declarations: [MainComponent, EditAccountComponent, CreatePaymentComponent],
  imports: [CommonModule, MainRoutingModule, NgxsModule.forFeature([AccountState]), SharedModule],
  providers: [AccountService],
})
export class MainModule {
}
