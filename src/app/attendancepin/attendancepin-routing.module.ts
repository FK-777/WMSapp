import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancepinComponent } from './attendancepin.component';

const routes: Routes = [
  {
    path: '',
    component: AttendancepinComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendancepinComponentRoutingModule {}
