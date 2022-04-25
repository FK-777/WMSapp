import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/common/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-attendancethumb',
  templateUrl: './attendancethumb.component.html',
  styleUrls: ['./attendancethumb.component.scss'],
})
export class AttendancethumbComponent implements OnInit, AfterViewInit {

  user = AuthService.getLoggedUser();

  @ViewChild('attendanceThumbFormRef', { static: false }) attendanceThumbFormRef: NgForm;
  @ViewChild('checkOutFormRef', { static: false }) checkOutFormRef: NgForm;
  public attendanceThumbForm: FormGroup;
  public checkOutForm: FormGroup;
  lat: number = 0;
  lng: number = 0;
  hour;
  minute;
  second;
  date;
  month;
  year;
  myDate = new Date();
  constructor(private route: Router, private faio: FingerprintAIO,
    private attendanceService: attendanceService, public toastController: ToastController,
    private geo: Geolocation, private datePipe: DatePipe,
    private dashboard: DashboardComponent) {
    }

  ngAfterViewInit(): void {}

  pin() {
    this.route.navigate(['/attendancepin']);
  }
  
  
  ngOnInit() {
    this.getLocation();
    console.log(this.myDate.getTime());
    console.log(this.myDate.getHours() + "/" + this.myDate.getMinutes() + "/" + this.myDate.getSeconds());
    console.log(this.myDate.getDate()+ "/" + this.myDate.getMonth() + "/" + this.myDate.getFullYear());
    this.attendanceThumbForm = new FormGroup({
      //type: new FormControl('', [Validators.required]),
    });
  }

  // timer(){
  //   setTimeout(()=>{                           // <<<---using ()=> syntax
  //     this.presentToast("Time Over");
  //     this.show = false;
  //     console.log(this.show);
  // }, 10000);
  // }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  public showFingeerprintAuthentication() {

    console.log("Button clicked")
    this.createAttendance()
    this.faio.isAvailable().then((result: any) => {
      console.log(result)
      console.log("Button clicked")
      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Please put your thumb on your device fingerprint scanner to proceed!",
        disableBackup: true,
        title: 'Biometric Attendance',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'Use Device Scanner'
      })
        .then((result: any) => {
          console.log(result)
          alert("Successfully Authenticated!");
          this.createAttendance()
          
        })
        .catch((error: any) => {
          console.log(error)
          //alert("Match not found!")
          this.route.navigate(['/attendancepin']);
        });
    })
      .catch((error: any) => {
        console.log(error)
      });
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



  createAttendance() {
    //this.isSubmitted = true;
    console.log(this.attendanceThumbForm.value);
     if (this.attendanceThumbForm.invalid) {
       this.attendanceThumbForm.markAllAsTouched();
       this.presentToast("All the fields are required!");
       console.log("in if statement");
       return;
     }
    const value = JSON.parse(JSON.stringify(this.attendanceThumbForm.value));
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
    value['isVerified'] = true;
    
    
    //value['signature'] = this.signatureImage;
    //value['barcode'] = this.scannedData["text"];
    //console.log(AuthService.getLoggedUser().id);
    //console.log(this.user._id);
    delete value._id;
    console.log("out of if statement...");

     if (this.attendanceThumbForm.value._id) {
       this.attendanceService.updateAttendance(this.attendanceThumbForm.value._id, value).subscribe((response) => {
         console.log("Attendance updated successfully");
         this.attendanceThumbForm.reset();
       
         //this.fetchSample();
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
        this.dashboard.setMarked(true);
        this.attendanceThumbForm.reset();
        this.route.navigate(['/dashboard']);
      })
      
    }

    checkOut() {
      //console.log(sampleId);
      this.hour = this.myDate.getHours();
      this.minute = this.myDate.getMinutes();
      this.second = this.myDate.getSeconds();
    //value['inTime'] = this.hour + ":" + this.minute + ":" + this.second;
      
      this.attendanceService.updateAttendance("625e7404d24f0308fbf774da", {"outTime":this.hour + ":" + this.minute + ":" + this.second}).subscribe((response) => {
        //this.toastr.success('Sample updated successfully');
        console.log("checkOut updated successfully");
        this.presentToast("Check-Out Time" + this.myDate.getHours() + ":" + this.myDate.getMinutes());
        this.route.navigate(['/dashboard']);
        
      }, (error) => {
      });
     }
  
}
