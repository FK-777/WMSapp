import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/common/auth.service';
import { userService } from 'src/app/core/services/user.service';
import { locationService } from 'src/app/core/services/location.service';
import { LoadingController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-attendancepin',
  templateUrl: './attendancepin.component.html',
  styleUrls: ['./attendancepin.component.scss'],
})
export class AttendancepinComponent implements OnInit, AfterViewInit {

  user = AuthService.getLoggedUser();
  userID = AuthService.getLoggedUser().id;
  officeID = AuthService.getLoggedUser().OfficeId;
  
  @ViewChild('attendancePinFormRef', { static: false }) attendancePinFormRef: NgForm;
  @ViewChild('pinFormRef', { static: false }) pinFormRef: NgForm;
  @ViewChild('locationFormRef', { static: false }) locationFormRef: NgForm;
  public locationForm: FormGroup;
  public attendancePinForm: FormGroup;
  public pinForm: FormGroup;
  lat: number = 0;
  lng: number = 0;
  latbg: number = 0;
  lngbg: number = 0;
  public users = [];
  public itsMe = [];
  public myOffice = [];
  public officeUserOne = [];
  public officeUserTwo = [];

  allAttendance = [];
  todaysAbsent = [];
  attID;

  userLoc;

  hour;
  minute;
  second;
  date;
  month;
  year;
  
  myDate = new Date();
  currentDateTime: any;
  currentExchangeDate : any;
  constructor(private route: Router, private userService: userService,
    private attendanceService: attendanceService, public toastController: ToastController,
    private locationService: locationService,
    private geo: Geolocation, private datePipe: DatePipe,
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private loadingCtrl: LoadingController,
    private _DIAGNOSTIC: Diagnostic,
    private androidPermissions: AndroidPermissions) {
    }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.fetchUsers();
    this.getLocation();
    this.fetchOfficeUsers();
    this.fetchCurentDate();
    this.attendancePinForm = new FormGroup({
      //pin: new FormControl('', [Validators.required]),
    });
    this.locationForm = new FormGroup({
      //pin: new FormControl('', [Validators.required]),
    });
    this.pinForm = new FormGroup({
      pin: new FormControl('', [Validators.required]),
    });

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public locCheck(){
    console.log("clicked");
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => {if(result.hasPermission){this.permission()}else this.presentToast("Please Grant Location Permission!")},
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
    );
  }

  public permission(){
    this._DIAGNOSTIC.isLocationEnabled().then((isEnabled) => {
      if(!isEnabled){
        this.presentToast("Please Turn on the Location!");
          //handle confirmation window code here and then call switchToLocationSettings
        this._DIAGNOSTIC.switchToLocationSettings();
      }
      else if(isEnabled){
        console.log(this.getLocation());
        this.submit();
      }
    })
  }

  getLocation() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      console.log(this.lat, this.lng);
    }).catch((e) => {
      console.log(e);
    });
  }

  async submit(){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      //duration: 3000
      spinner: "dots"
    });
    await loading.present();
    console.log(this.pinForm.value.pin);
    console.log(this.itsMe[0]['pin']);
     if (this.pinForm.invalid) {
       this.pinForm.markAllAsTouched();
       loading.dismiss();
       this.presentToast("Please Enter a 4 digit PIN!");
       console.log("in if statement");
     }
     this.hour = this.myDate.getHours();

    //  loading.dismiss();
    //  this.createAttendance();

        if(this.pinForm.value.pin == this.itsMe[0]['pin'] && this.currentDateTime != 0 && this.currentDateTime != 6 && this.hour == 8){
          console.log("Correct");
          loading.dismiss();
          this.createAttendance();
        }else if(this.pinForm.value.pin == this.itsMe[0]['pin'] && (this.currentDateTime == 0 || this.currentDateTime == 6)){
        console.log("Not Correct");
        loading.dismiss();
        this.presentToast("Its a holiday");
        }else if(this.pinForm.value.pin == this.itsMe[0]['pin'] && this.currentDateTime != 0 && this.currentDateTime != 6 && this.hour > 8){
         console.log("Not Correct");
         loading.dismiss();
                 this.presentToast("You're Late!");
                 }else if(this.pinForm.value.pin != this.itsMe[0]['pin']){
                   loading.dismiss();
                   this.presentToast("Incorrect PIN");
                 }
              
  }

  public fetchCurentDate(){
    this.currentDateTime= new Date().getDay();
   console.log(this.currentDateTime);
   this.currentExchangeDate=this.datePipe.transform((new Date), 'dd/MM/yyyy');
     console.log(this.currentExchangeDate);
    }
    
  async createAttendance() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      //duration: 3000
      spinner: "dots"
    });
    await loading.present();
    //this.isSubmitted = true;
    console.log(this.attendancePinForm.value);
     if (this.attendancePinForm.invalid) {
       this.attendancePinForm.markAllAsTouched();
       this.presentToast("All the fields are required!");
       console.log("in if statement");
       loading.dismiss();
       return;
     }
    const value = JSON.parse(JSON.stringify(this.attendancePinForm.value));
    value[`EmployeeId`] = AuthService.getLoggedUser().id;
    value[`OfficeId`] = this.officeID;
    this.hour = this.myDate.getHours();
    this.minute = this.myDate.getMinutes();
    this.second = this.myDate.getSeconds();
    value['inTime'] = this.hour + ":" + this.minute + ":" + this.second;
    //value['outTime'] = this.lng;
    this.date = this.myDate.getDate();
    this.month = this.myDate.getMonth() + 1;
    this.year = this.myDate.getFullYear();
    console.log(this.date, this.month, this.year);
    this.getLocation();
    if((this.myOffice['lng'] == this.lng || (this.myOffice['lng'] <= this.lng+0.00009999 && this.myOffice['lng'] >= this.lng-0.00009999))
    && 
    (this.myOffice['lat'] == this.lat || (this.myOffice['lat'] <= this.lat+0.00009999 && this.myOffice['lat'] >= this.lat-0.00009999))){
     value['location'] = "in";
     this.userLoc = "in";
   }
   else{
    value['location'] = "out";
    this.userLoc = "out";
  }
    value['date'] = this.date + "/" + this.month + "/" + this.year;
    value['day'] = this.myDate.getDay();
    value['month'] = this.myDate.getMonth();
    value['lat'] = this.lat;
    value['lng'] = this.lng;
    value['status'] = "Present";
    value['isVerified'] = true;
    value['entery'] = "pin";
     if (this.attendancePinForm.value._id) {
       this.attendanceService.updateAttendance(this.attendancePinForm.value._id, value).subscribe((response) => {
         console.log("Attendance updated successfully");
         loading.dismiss();
         this.attendancePinForm.reset();
       }, (error) => {
        loading.dismiss();
       })
     }
     else
     console.log("Else!");
     const conditions = {};
     this.attendanceService.getAttendance(conditions).subscribe((response) =>{
      this.allAttendance =response;
      for(let i=0, j=0; i < this.allAttendance.length ; i++){
        if(this.allAttendance[i]['EmployeeId'] == this.userID  && this.allAttendance[i]['date'] == this.currentExchangeDate && this.allAttendance[i]['status'] == "Absent"){
        this.todaysAbsent[j] = this.allAttendance[i];
        console.log(this.todaysAbsent);
        j++;
        }
      }
      this.attID = this.todaysAbsent[0]['_id'];
      console.log(this.todaysAbsent);
      console.log(this.attID);
    

      this.attendanceService.updateAttendance(this.attID, {"inTime":this.hour + ":" + this.minute + ":" + this.second}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"outTime":"none"}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"inHour":this.hour}).subscribe((response) => {
        console.log("Attendance updated successfully");})
        this.attendanceService.updateAttendance(this.attID, {"inMin": this.minute}).subscribe((response) => {
          console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"day":this.myDate.getDay()}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"month":this.myDate.getMonth()+1}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"lat":this.lat}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"lng":this.lng}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"status":"Present"}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"entery":"pin"}).subscribe((response) => {
      console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"location":this.userLoc}).subscribe((response) => {
        console.log("Attendance updated successfully");})
      this.attendanceService.updateAttendance(this.attID, {"isVerified":true}).subscribe((response) => {
      console.log("Attendance updated successfully");})        

      // this.attendanceService.createAttendance(value).subscribe((response) => {
      //   console.log(response);
      //   //this.toastr.success('New Sample created!');
      //   console.log("Applied!");
      loading.dismiss();
         this.presentToast("Attendance Marked Successfully!");
      //   this.attendancePinForm.reset();
      this.initializeAppToBG();
      console.log("bgActivated!");
         this.route.navigate(['/dashboard']);
      })
      
    }

    fetchUsers() {
      const conditions = {};
      console.log(this.userID);
      this.userService.getUsers(conditions).subscribe((response) => {
      this.users = response;
      //if(this.labs. == this.labId){}
      for(let i=0, j=0; i<this.users.length; i++){
        if(this.users[i]['_id'] == this.userID){
          this.itsMe[j] = this.users[i];
          j++;
          console.log("inside If Statement");
          console.log(this.itsMe[0]);
        }
      }
      console.log(this.itsMe);
      })
    }

    fetchOfficeUsers() {
      const conditions = {};
      console.log(this.officeID);
      this.userService.getUsers(conditions).subscribe((response) => {
      this.officeUserOne = response;
      for(let i=0, j=0; i<this.officeUserOne.length; i++){
        if(this.officeUserOne[i]['_id'] == this.officeID){
          
          this.myOffice = this.officeUserOne[i]
          console.log(this.lng);
         console.log(this.myOffice['lng'])
        
          
          //this.officeUserTwo[j] = this.officeUserOne[i];
          //j++;
         
        }
      }
     
      })
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
      this.backgroundMode.on('activate').subscribe(s => {
        console.log("active");
        this.backgroundMode.disableWebViewOptimizations();
        // this.backgroundMode.moveToBackground();
        // console.log("to background");
        // this.backgroundMode.moveToForeground();
         console.log("to background");
         setInterval(()=>{
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
      this.latbg = res.coords.latitude;
      this.lngbg = res.coords.longitude;
      console.log(this.latbg, this.lngbg);
        //console.log(this.lat, this.lng);
      }).catch((e) => {
        console.log(e);
      });
    }

    createLocation(){
    const value = JSON.parse(JSON.stringify(this.locationForm.value));
    this.backgroundLocation();
    const currentTimeForBG = new Date();
    value[`EmployeeId`] = AuthService.getLoggedUser().id;
    value[`OfficeId`] = this.officeID;
    value['date'] = this.date + "/" + this.month + "/" + this.year;
    value['time'] = currentTimeForBG.getHours() + ":" + currentTimeForBG.getMinutes() + ":" + currentTimeForBG.getSeconds()
    value['latitude'] = this.latbg;
    value['longitude'] = this.lngbg;

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
        this.presentToast("Track Successfull!");
        this.locationForm.reset();
      })
    }

}
