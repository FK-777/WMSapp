import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendancepinComponent } from './attendancepin.component';
import { DatePipe } from '@angular/common';
import { AttendancepinComponentRoutingModule } from './attendancepin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AttendancepinComponentRoutingModule
  ],
  declarations: [AttendancepinComponent],
  providers: [DatePipe]
})
export class AttendancepinComponentModule {}
