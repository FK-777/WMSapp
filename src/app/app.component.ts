import { Component, ViewChild } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';

import { locationService } from 'src/app/core/services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild('locationFormRef', { static: false }) locationFormRef: NgForm;
  public locationForm: FormGroup;

  lat: number = 0;
  lng: number = 0;
  

  constructor(
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private locationService: locationService,
    private geo: Geolocation
    ) {
      //this.initializeApp();
      this.locationForm = new FormGroup({
        //type: new FormControl('', [Validators.required]),
      });
      //this.initializeAppToBG();
      //console.log("Background Enabled!");
      
    }

    initializeAppToBG() {
      this.platform.ready().then(() => {
        //this.statusBar.styleDefault();
        //this.splashScreen.hide();
        // Enable Background
        this.backgroundMode.setDefaults({
          title: 'Active',
          text: 'App is tracking you!',
          icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
          //color: String // hex format like 'F14F4D'
          resume: true,
          hidden: false,
          bigText: true
      })
      this.backgroundMode.enable();
      console.log("enable");
      this.backgroundMode.on('activate').subscribe(s => {
        console.log("active");
        this.backgroundMode.disableWebViewOptimizations();
        // this.backgroundMode.moveToBackground();
        // console.log("to background");
        // this.backgroundMode.moveToForeground();
         console.log("to background");
          setTimeout(()=>{
          console.log("timeout");
          this.createLocation();
        },3600000);
     });
      //this.backgroundMode.moveToBackground();
    });
    }

    backgroundLocation() {
      this.geo.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: true
      }).then((res) => {
      //  StorageService.setItem("lat1", res.coords.latitude);
      //  console.log(StorageService.getItem("lat1"));
      //  StorageService.setItem("lat2", res.coords.latitude);
      //  StorageService.setItem("lat3", res.coords.latitude);
      //  StorageService.setItem("lng1", res.coords.longitude);
      //  console.log(StorageService.getItem("lng1"));
      //  StorageService.setItem("lng2", res.coords.longitude);
      //  StorageService.setItem("lng3", res.coords.longitude);
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      console.log(this.lat, this.lng);
        console.log(this.lat, this.lng);
      }).catch((e) => {
        console.log(e);
      });
    }

    createLocation(){
    const value = JSON.parse(JSON.stringify(this.locationForm.value));
    this.backgroundLocation();
    //value[`EmployeeId`] = AuthService.getLoggedUser().id;
    //value[`OfficeId`] = this.officeID;
    //value['date'] = this.date + "/" + this.month + "/" + this.year;
    //value['time'] = this.myDate.getHours() + ":" + this.myDate.getMinutes() + ":" + this.myDate.getSeconds()
    value['latitude'] = this.lat;
    value['longitude'] = this.lng;

    delete value._id;
     if (this.locationForm.value._id) {
       this.locationService.updateLocation(this.locationForm.value._id, value).subscribe((response) => {
         console.log("location updated successfully");
         this.locationForm.reset();
       }, (error) => {
       })
     }
     else
     console.log("Else!");
      this.locationService.createLocation(value).subscribe((response) => {
        console.log(response);
        console.log("UPDATED!");
        //this.presentToast("Track Successfull!");
        this.locationForm.reset();
      })
    }
}
