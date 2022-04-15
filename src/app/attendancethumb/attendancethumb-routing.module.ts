import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancethumbComponent } from './attendancethumb.component';

const routes: Routes = [
  {
    path: '',
    component: AttendancethumbComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendancethumbComponentRoutingModule {}
