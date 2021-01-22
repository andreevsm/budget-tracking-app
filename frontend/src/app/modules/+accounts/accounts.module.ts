import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './accounts.routing';
import { CreateAccountComponent } from './modals';
import { AccountComponent, StatisticsComponent } from './components';
import {
  StatisticsContainerComponent,
  HistoryContainerComponent,
  AccountContainerComponent,
  AccountsContainerComponent,
} from './containers';
import { AccountLayoutComponent } from './layouts';
import { CreateCategoryComponent } from './modals/create-category/create-category.component';

@NgModule({
  declarations: [
    AccountComponent,
    CreateAccountComponent,
    StatisticsContainerComponent,
    StatisticsComponent,
    HistoryContainerComponent,
    AccountContainerComponent,
    AccountsContainerComponent,
    AccountLayoutComponent,
    CreateCategoryComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule,
  ],
})
export class MainModule {}
