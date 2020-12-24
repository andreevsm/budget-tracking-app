import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { CreatePaymentComponent } from './modals';
import { AccountComponent, AccountsComponent, HistoryComponent } from './components';

@NgModule({
  declarations: [CreatePaymentComponent, AccountsComponent, AccountComponent, HistoryComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
