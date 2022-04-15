import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApplyLeaveComponent } from './apply-leave.component';

import { ApplyLeaveComponentRoutingModule } from './apply-leave-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyLeaveComponentRoutingModule
  ],
  declarations: [ApplyLeaveComponent]
})
export class ApplyLeaveComponentModule {}
