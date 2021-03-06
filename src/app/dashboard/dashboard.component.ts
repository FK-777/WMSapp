import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/common/auth.service';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/core/services/common/storage.service';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { leaveService } from 'src/app/core/services/leave.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

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


  currentDateTime : any ;
  user = AuthService.getLoggedUser();
  userId = AuthService.getLoggedUser().id ;
  leaves = [];
  attendanceLeaves = [];
  markerleave =0;
  attendance  = [] ;
  officeLeaves = [];
  markedFail = 0 ; 
  alreadyPresent = 0;
  alreadyAbsent = 0;
  hour;
  minute;
  second;
  byCheckin;
  date;
  month;
  year;
  myDate = new Date();
  // lat1: number = 0;
  // lng1: number = 0;
  // lat2: number = 0;
  // lng2: number = 0;
  // lat3: number = 0;
  // lng3: number = 0;

  constructor( private route: Router,
    private attendanceService: attendanceService,
    private leaveService: leaveService,
    public toastController: ToastController,
    private datepipe: DatePipe,
    private geo: Geolocation,
    private loadingCtrl: LoadingController
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
    this.fetchCurentDate();
   // this.fetchAttendances();
   // this.checkin();
   this.fetchPerDate();
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
  public fetchCurentDate (){
    this.currentDateTime=this.datepipe.transform((new Date), 'dd/MM/yyyy');
   console.log(this.currentDateTime);
    }



  //   fetchAttendances(){
  //     const conditions = {};
  //     this.attendanceService.getAttendance(conditions).subscribe((response) =>{
  //       this.attendance =response;
  //       for(let i=0 , j=0; i < this.attendance.length ; i++){
  //         if(this.attendance[i]['EmployeeId'] == this.userId && this.attendance[i]['date'] == this.currentDateTime){
  //         this.officeLeaves[j] = this.attendance[i];
  //         this.markedFail = this.officeLeaves.length;
  //         console.log("our succesffull addation");
  //         console.log(this.markedFail);
  //         j++;
  //         }
          

  //       }
  //     })
  //  }


  async checkin(){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      //duration: 3000
      spinner: "dots"
    });
    await loading.present();
    const condition = {};
    this.leaveService.getLeaves(condition).subscribe((response) =>{
    this.leaves =response;
    for(let one=0 , two=0; one < this.leaves.length ; one++){
    if(this.leaves[one]['EmployeeId'] == this.userId){
    this.attendanceLeaves[two] = this.leaves[one];
    this.markerleave = this.attendanceLeaves.length;
    console.log("Mytoally Leaves")
    two++; 
    }
  }
  const conditions = {};
    this.attendanceService.getAttendance(conditions).subscribe((response) =>{
      this.attendance =response;
      for(let i=0 , j=0; i < this.attendance.length ; i++){
        if(this.attendance[i]['EmployeeId'] == this.userId && this.attendance[i]['date'] == this.currentDateTime && this.attendance[i]['status'] == "Present"){
        this.officeLeaves[j] = this.attendance[i];
        this.markedFail = this.officeLeaves.length;
        this.alreadyPresent++;
        console.log("our succesffull addation");
        console.log(this.markerleave);
        console.log(this.markedFail);
        j++;
        }
      }
      if(this.alreadyPresent != 0){
        console.log(this.alreadyPresent);
        loading.dismiss();
        this.presentToast("You've Marked Already!");
      }else{
        loading.dismiss();
        this.route.navigate(['/attendancethumb']);
      }
      
    })
  })
  }

  public fetchPerDate (){
    this.hour= new Date().getHours();
    this.byCheckin = new Date();
    console.log("my New Date is on the")
    console.log(this.byCheckin);
   console.log(this.currentDateTime);
    }


  checkout(){
    this.route.navigate(['/checkout']);
  }
  settings() {
    this.route.navigate(['/settings']);
  }
  applyleave(){
    this.route.navigate(['/apply-leave']);
  //  const conditions = {};
  //    this.attendanceService.getAttendance(conditions).subscribe((response) =>{
  //      this.attendance =response;
  //      for(let i=0 , j=0; i < this.attendance.length ; i++){
  //        if(this.attendance[i]['EmployeeId'] == this.userId && this.attendance[i]['date'] == this.currentDateTime){
  //        this.officeLeaves[j] = this.attendance[i];
  //        this.markedFail = this.officeLeaves.length;
  //        console.log("our succesffull addation");
  //        console.log(this.markedFail);
  //        j++;
  //        }
  //      }
  //      if(this.markedFail == 0){
  //       this.route.navigate(['/apply-leave']);
  //      }else{
  //      console.log("ELSE");
  //      this.presentToast("Today , you are present!");
  //      }
  //    })
    
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


  

 setDelay(times) {
  if (times.length > 0) {
    // Remove the first time from the array
    let wait = times.shift();
    console.log("Waiting For: " + wait/1000 + " seconds");
    
    // Wait for the given amount of time
    setTimeout(() => {
        console.log("Waited For: " + wait/1000 + " seconds");
        // Call the setDelay function again with the remaining times
        this.setDelay(times);
    }, wait);
  }

  
  // start() {
  //   this.backgroundGeolocation.start();
  // }
  // stop() {
  //   this.backgroundGeolocation.stop();
  // }

}

// getLocation() {
//   this.geo.getCurrentPosition({
//     timeout: 10000,
//     enableHighAccuracy: true
//   }).then((res) => {
//     StorageService.setItem("lat1", res.coords.latitude);
//     StorageService.setItem("lat2", res.coords.latitude);
//     StorageService.setItem("lat3", res.coords.latitude);
//     StorageService.setItem("lng1", res.coords.longitude);
//     StorageService.setItem("lng2", res.coords.longitude);
//     StorageService.setItem("lng3", res.coords.longitude);
//     //this.lat = res.coords.latitude;
//     //this.lng = res.coords.longitude;
//     //console.log(this.lat, this.lng);
//   }).catch((e) => {
//     console.log(e);
//   });
// }

}


