import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';

import { ExpansesService } from './models/expanses/expanses.service';
import { ExpansesState } from './models/expanses/expanses.state';
import { AccountState, AccountService } from './models';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main/main.component';
import { EditAccountComponent } from './modals/edit-account/edit-account.component';

@NgModule({
  declarations: [MainComponent, EditAccountComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxsModule.forFeature([AccountState, ExpansesState]),
    SharedModule,
  ],
  providers: [AccountService, ExpansesService],
})
export class MainModule {}
