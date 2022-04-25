import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';

import { CheckoutComponentRoutingModule } from './checkout-routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutComponentRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutComponentModule {}
