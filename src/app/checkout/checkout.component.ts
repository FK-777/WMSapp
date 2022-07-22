import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/common/auth.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  user = AuthService.getLoggedUser().id;
  lat: number = 0;
  lng: number = 0;
  officeID = AuthService.getLoggedUser().OfficeId;
  hour;
  minute;
  second;
  date;
  month;
  year;
  myDate = new Date();
  currentDateTime: any;
 newCurrentDate: any;
  marked = false;
  markx = 0;

  userId = AuthService.getLoggedUser().id ;
  attendance  = [] ;
  officeLeaves = [];
  markedFail = 0 ;
  constructor(private route: Router, private faio: FingerprintAIO,
    private attendanceService: attendanceService, public toastController: ToastController,
    private geo: Geolocation, private datePipe: DatePipe,
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.fetchCurentDate();
    this.fetchAttendence();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  updateApproveStatus(attendanceId : any) {
    this.hour = this.myDate.getHours();
    this.minute = this.myDate.getMinutes();
    this.second = this.myDate.getSeconds();
    this.newCurrentDate = this.hour + ":" + this.minute + ":" + this.second;
    if(this.hour >= 13 ){
      this.attendanceService.updateAttendance(attendanceId, {"outHour":this.hour}).subscribe((response) => {
        console.log("Attendance updated successfully");})
        this.attendanceService.updateAttendance(attendanceId, {"outMin": this.minute}).subscribe((response) => {
          console.log("Attendance updated successfully");})
    this.attendanceService.updateAttendance(attendanceId, {"outTime":this.newCurrentDate}).subscribe((response) => {
      console.log("Attendance updated successfully");
      this.presentToast("Day Off Successful!");
      this.backgroundEnd();
      this.route.navigate(['/dashboard']);
    }, (error) => {
    });
    }else
    this.presentToast("Its too early to leave Office!");
  }
  
  public fetchCurentDate (){
    this.currentDateTime=this.datePipe.transform((new Date), 'dd/MM/yyyy');
    console.log(this.currentDateTime);
    }

    async fetchAttendence(){
      const loading = await this.loadingCtrl.create({
        message: 'Please Wait...',
        //duration: 3000
        spinner: "dots"
      });
      await loading.present();
      const conditions = {};
      this.attendanceService.getAttendance(conditions).subscribe((response) =>{
        this.attendance =response;
        for(let i=0 , j=0; i < this.attendance.length ; i++){
          if(this.attendance[i]['EmployeeId'] == this.userId  && this.attendance[i]['date'] == this.currentDateTime && this.attendance[i]['outTime'] == "none" && this.attendance[i]['status'] == "Present"){
          this.officeLeaves[j] = this.attendance[i];
          console.log(this.officeLeaves);
          this.markedFail = this.officeLeaves.length;
          console.log(this.markedFail);
          j++;
          //loading.dismiss();
          }
        }
      })
      loading.dismiss();
    }

    backgroundEnd() {
      this.platform.ready().then(() => {
        this.backgroundMode.setDefaults({
          title: 'Active',
          text: 'App is tracking you!',
          icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
          //color: String // hex format like 'F14F4D'
          resume: true,
          hidden: false,
          bigText: true
      })
      this.backgroundMode.disable();
      });
    }
}
