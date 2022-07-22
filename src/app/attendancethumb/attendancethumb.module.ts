import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendancethumbComponent } from './attendancethumb.component';
import { DatePipe } from '@angular/common';
import { AttendancethumbComponentRoutingModule } from './attendancethumb-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AttendancethumbComponentRoutingModule
  ],
  declarations: [AttendancethumbComponent],
  providers: [DatePipe, DashboardComponent, Diagnostic, AndroidPermissions]
})
export class AttendancethumbComponentModule {}
