import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceReportComponent } from './attendance-report.component';
import { AttendanceReportComponentRoutingModule } from './attendance-report-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AttendanceReportComponentRoutingModule
  ],
  declarations: [AttendanceReportComponent]
})
export class AttendanceReportComponentModule {}
