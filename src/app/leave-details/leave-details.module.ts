import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LeaveDetailsComponent } from './leave-details.component';

import { LeaveDetailsComponentRoutingModule } from './leave-details-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveDetailsComponentRoutingModule
  ],
  declarations: [LeaveDetailsComponent]
})
export class LeaveDetailsComponentModule {}
