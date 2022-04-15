import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveDetailsComponent } from './leave-details.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveDetailsComponentRoutingModule {}
