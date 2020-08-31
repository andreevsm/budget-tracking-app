import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from '../shared/material/material.module';

import { AccountState, AccountService } from './models';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main/main.component';
import { EditAccountComponent } from './modals/edit-account/edit-account.component';

@NgModule({
  declarations: [MainComponent, EditAccountComponent],
  imports: [CommonModule, MainRoutingModule, NgxsModule.forFeature([AccountState]), MaterialModule],
  providers: [AccountService],
})
export class MainModule {}
