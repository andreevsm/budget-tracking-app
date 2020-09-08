import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';

import { PaymentState } from './models/payment/payment.state';
import { PaymentService } from './models/payment/payment.service';
import { AccountState, AccountService } from './models';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main/main.component';
import { EditAccountComponent } from './modals/edit-account/edit-account.component';

@NgModule({
  declarations: [MainComponent, EditAccountComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxsModule.forFeature([AccountState, PaymentState]),
    SharedModule,
  ],
  providers: [AccountService, PaymentService],
})
export class MainModule {}
