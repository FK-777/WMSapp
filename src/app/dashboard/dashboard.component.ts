import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/common/auth.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/common/storage.service';
// import { BackgroundGeolocation, 
//   BackgroundGeolocationConfig, 
//   BackgroundGeolocationEvents, 
//   BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // config: BackgroundGeolocationConfig = {
  //   desiredAccuracy: 0,
  //   stationaryRadius: 10,
  //   distanceFilter: 30,
  //   debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  // };

  marked = false;
  
  user = AuthService.getLoggedUser();

  constructor( private route: Router, public toastController: ToastController,
    ) { 
//       this.backgroundGeolocation.configure(this.config).then(() => {
//         this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
//         console.log('Locations', location);
//         console.log('Speed', location.speed); // Tracks the speed of user

//         // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
//        // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
//       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
//      // this.backgroundGeolocation.finish(); // FOR IOS ONLY
//    });
// });
    }

    


  ngOnInit() {
    console.log(this.user);
    StorageService.setItem("markedValue", this.marked);
    console.log(StorageService.getItem("markedValue"));
    //this.start();
  }
  public getMarked(){}
  public setMarked(val: boolean){
    this.marked = val;
    StorageService.setItem("markedValue", this.marked);
    console.log(this.marked);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  checkin(){
    if(!StorageService.getItem("markedValue")){
      console.log("IFFF");
      this.route.navigate(['/attendancethumb']);
    }else{
    console.log("ELSE");
    this.presentToast("You've Marked Already!");
    }
  }
  checkout(){
    this.route.navigate(['/checkout']);
  }
  settings() {
    this.route.navigate(['/settings']);
  }
  applyleave(){
    this.route.navigate(['/apply-leave']);
  }
  leavereport(){
    this.route.navigate(['/leave-list']);
  }
  attendanereport(){
    this.route.navigate(['/attendance-report']);
  }

  logout(){
    AuthService.removeLoggedUser();
    this.route.navigate(['/login']);
  }
  
  // start() {
  //   this.backgroundGeolocation.start();
  // }
  // stop() {
  //   this.backgroundGeolocation.stop();
  // }

}
