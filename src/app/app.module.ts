import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { UiLoaderService } from 'src/app/_core/services/common/ui-loader.service';
//import { AuthenticationService, AuthService, WrapHttpService } from './_core/services/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthModule } from './auth/auth.module';
import { AuthService } from './core/services/common/auth.service';
import { AuthenticationService } from './core/services/common/authentication.service';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { WrapHttpService } from './core/services/common/wrap-http.service';
import { AuthModule } from './auth/auth.module';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule,
        AuthModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
        })],
    providers: [
        Geolocation,
        FingerprintAIO,
        //BackgroundGeolocation,
        AuthService,
        AuthenticationService,
        WrapHttpService,
        BackgroundMode,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
