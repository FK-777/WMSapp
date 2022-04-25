import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/common/auth.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-attendancepin',
  templateUrl: './attendancepin.component.html',
  styleUrls: ['./attendancepin.component.scss'],
})
export class AttendancepinComponent implements OnInit, AfterViewInit {

  user = AuthService.getLoggedUser();
  userID = AuthService.getLoggedUser().id;

  @ViewChild('attendancePinFormRef', { static: false }) attendancePinFormRef: NgForm;
  @ViewChild('pinFormRef', { static: false }) pinFormRef: NgForm;
  public attendancePinForm: FormGroup;
  public pinForm: FormGroup;
  lat: number = 0;
  lng: number = 0;
  public users = [];
  public itsMe = [];
  hour;
  minute;
  second;
  date;
  month;
  year;
  myDate = new Date();
  constructor(private route: Router, private userService: userService,
    private attendanceService: attendanceService, public toastController: ToastController,
    private geo: Geolocation, private datePipe: DatePipe) {
    }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.fetchUsers();
    this.getLocation();
    this.attendancePinForm = new FormGroup({
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

  submit(){
    console.log(this.pinForm.value.pin);
    console.log(this.itsMe[0]['pin']);
     if (this.pinForm.invalid) {
       this.pinForm.markAllAsTouched();
       this.presentToast("Please Enter a 4 digit PIN!");
       console.log("in if statement");
     }

     if(this.pinForm.value.pin == this.itsMe[0]['pin']){
       console.log("Correct");
       this.createAttendance();
     }else{
     console.log("Not Correct");
     this.presentToast("Incorrect PIN!");
     }
  }

  createAttendance() {
    //this.isSubmitted = true;
    console.log(this.attendancePinForm.value);
     if (this.attendancePinForm.invalid) {
       this.attendancePinForm.markAllAsTouched();
       this.presentToast("All the fields are required!");
       console.log("in if statement");
       return;
     }
    const value = JSON.parse(JSON.stringify(this.attendancePinForm.value));
    value[`EmployeeId`] = AuthService.getLoggedUser().id;
    this.hour = this.myDate.getHours();
    this.minute = this.myDate.getMinutes();
    this.second = this.myDate.getSeconds();
    value['inTime'] = this.hour + ":" + this.minute + ":" + this.second;
    //value['outTime'] = this.lng;
    this.date = this.myDate.getDate();
    this.month = this.myDate.getMonth() + 1;
    this.year = this.myDate.getFullYear();
    console.log(this.date, this.month, this.year);
    value['date'] = this.date + "/" + this.month + "/" + this.year;
    value['day'] = this.myDate.getDay();
    value['lat'] = this.lat;
    value['lng'] = this.lng;
    value['status'] = "Present";
    value['isVerified'] = false;
    console.log("out of if statement...");

     if (this.attendancePinForm.value._id) {
       this.attendanceService.updateAttendance(this.attendancePinForm.value._id, value).subscribe((response) => {
         console.log("Attendance updated successfully");
         this.attendancePinForm.reset();
       }, (error) => {
       })
     }
     else
     console.log("Else!");
      this.attendanceService.createAttendance(value).subscribe((response) => {
        console.log(response);
        //this.toastr.success('New Sample created!');
        console.log("Applied!");
        this.presentToast("Attendance Marked Successfully!");
        this.attendancePinForm.reset();
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

}
