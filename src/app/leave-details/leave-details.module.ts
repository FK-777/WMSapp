import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LeaveDetailsComponent } from './leave-details.component';

import { LeaveDetailsComponentRoutingModule } from './leave-details-routing.module';
import { LeaveListComponent } from '../leave-list/leave-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveDetailsComponentRoutingModule
  ],
  declarations: [LeaveDetailsComponent],
  providers: [DatePipe]
})
export class LeaveDetailsComponentModule {}
