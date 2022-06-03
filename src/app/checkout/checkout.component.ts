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

  userId = AuthService.getLoggedUser().id ;
  attendance  = [] ;
  officeLeaves = [];
  markedFail = 0 ;
  constructor(private route: Router, private faio: FingerprintAIO,
    private attendanceService: attendanceService, public toastController: ToastController,
    private geo: Geolocation, private datePipe: DatePipe,) { }

  ngOnInit() {
    this.fetchCurentDate();
    this.fetchAttendence();
  }

  updateApproveStatus(attendanceId : any) {
    this.hour = this.myDate.getHours();
    this.minute = this.myDate.getMinutes();
    this.second = this.myDate.getSeconds();
    this.newCurrentDate = this.hour + ":" + this.minute + ":" + this.second;
    if(this.hour >= 13 ){
    this.attendanceService.updateAttendance(attendanceId, {"outTime":this.newCurrentDate}).subscribe((response) => {
      console.log("Attendance updated successfully");
    }, (error) => {
    });
    }
  }
  
  public fetchCurentDate (){
    this.currentDateTime=this.datePipe.transform((new Date), 'dd/M/yyyy');
    console.log(this.currentDateTime);
    }

    fetchAttendence(){
      const conditions = {};
      this.attendanceService.getAttendance(conditions).subscribe((response) =>{
        this.attendance =response;
        for(let i=0 , j=0; i < this.attendance.length ; i++){
          if(this.attendance[i]['EmployeeId'] == this.userId  && this.attendance[i]['date'] == this.currentDateTime && this.attendance[i]['outTime'] == "none"){
          this.officeLeaves[j] = this.attendance[i];
          console.log("My question Too");
          console.log(this.officeLeaves);
          this.markedFail = this.officeLeaves.length;
          console.log("our succesffull addation");
          console.log(this.markedFail);
          j++;
          }
        }
      })
    }
}
