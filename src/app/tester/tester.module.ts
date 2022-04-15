import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TesterComponent } from './tester.component';

import { TesterComponentRoutingModule } from './tester-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesterComponentRoutingModule
  ],
  declarations: [TesterComponent]
})
export class TesterComponentModule {}
