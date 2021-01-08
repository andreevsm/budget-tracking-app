import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, PipesModule],
  exports: [MaterialModule, ReactiveFormsModule, PipesModule],
})
export class SharedModule {}
