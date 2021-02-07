import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainRoutingModule } from './accounts.routing';
import { CreateAccountComponent, CreateCategoryComponent } from './modals';
import { StatisticsComponent } from './components';
import { AccountsContainerComponent } from './containers';

@NgModule({
  declarations: [
    CreateAccountComponent,
    StatisticsComponent,
    AccountsContainerComponent,
    CreateCategoryComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
