import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardComponentRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardComponentRoutingModule
  ],
  declarations: [DashboardComponent]
  ,
  providers: [DatePipe],
})
export class DashboardComponentModule {}
