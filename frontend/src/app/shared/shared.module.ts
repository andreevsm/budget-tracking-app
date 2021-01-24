import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [ReactiveFormsModule, PipesModule],
  exports: [ReactiveFormsModule, PipesModule],
})
export class SharedModule {}
