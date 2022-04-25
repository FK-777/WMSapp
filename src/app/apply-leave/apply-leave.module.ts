import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplyLeaveComponent } from './apply-leave.component';
import { ApplyLeaveComponentRoutingModule } from './apply-leave-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApplyLeaveComponentRoutingModule
  ],
  declarations: [ApplyLeaveComponent]
})
export class ApplyLeaveComponentModule {}
