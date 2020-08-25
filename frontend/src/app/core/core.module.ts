import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from './material/material.module';
import { HeaderComponent, SpinnerComponent } from './components';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { CoreState } from './store';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([CoreState]),
  ],
  exports: [HeaderComponent, SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
