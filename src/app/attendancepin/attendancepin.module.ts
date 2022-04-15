import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AttendancepinComponent } from './attendancepin.component';

import { AttendancepinComponentRoutingModule } from './attendancepin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancepinComponentRoutingModule
  ],
  declarations: [AttendancepinComponent]
})
export class AttendancepinComponentModule {}
