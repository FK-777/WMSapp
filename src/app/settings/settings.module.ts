import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { SettingsComponentRoutingModule } from './settings-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsComponentRoutingModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsComponentModule {}
