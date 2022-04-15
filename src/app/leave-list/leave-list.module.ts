import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LeaveListComponent } from './leave-list.component';

import { LeaveListComponentRoutingModule } from './leave-list-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveListComponentRoutingModule
  ],
  declarations: [LeaveListComponent]
})
export class LeaveListComponentModule {}
