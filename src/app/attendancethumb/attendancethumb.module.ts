import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AttendancethumbComponent } from './attendancethumb.component';

import { AttendancethumbComponentRoutingModule } from './attendancethumb-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancethumbComponentRoutingModule
  ],
  declarations: [AttendancethumbComponent]
})
export class AttendancethumbComponentModule {}
