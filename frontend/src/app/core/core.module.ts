import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from '../shared/material/material.module';

import { HeaderComponent, SpinnerComponent, SidenavComponent } from './components';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { UIState, ExpansesState, ExpansesService } from './store';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, SidenavComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([UIState, ExpansesState]),
    MaterialModule,
  ],
  exports: [HeaderComponent, SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    ExpansesService,
  ],
})
export class CoreModule {}
