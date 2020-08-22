import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { AccountState, AccountService } from './models';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, NgxsModule.forFeature([AccountState])],
  providers: [AccountService],
})
export class MainModule {}
