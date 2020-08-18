import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StatisticsRoutingModule {}
