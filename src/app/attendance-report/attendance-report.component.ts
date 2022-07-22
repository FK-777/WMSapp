import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from '../core/services/common/auth.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
})
export class AttendanceReportComponent implements OnInit, AfterViewInit {
  
  @ViewChild('attendanceReportFormRef', { static: false }) attendanceReportFormRef: NgForm;
  public attendanceReportForm: FormGroup;


  constructor(private attendanceService: attendanceService, private datepipe : DatePipe,
    public toastController: ToastController, private loadingCtrl: LoadingController) { }
  ngAfterViewInit(): void {
  }

  allAttendance = [];
  myAttendance = [];
  myDateAttendance = [];
  user = AuthService.getLoggedUser();
  userId = AuthService.getLoggedUser().id;
  searchDate : any;
  currentDate;

  ngOnInit() {
    this.setupForm();
    //this.fetchAttendance();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async testerSubmitForm() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      //duration: 3000
      spinner: "dots"
    });
    await loading.present();
    //console.log(this.criteriaForm.value);
    this.currentDate = this.datepipe.transform((new Date), 'dd/MM/yyyy');
    console.log(this.attendanceReportForm.value.date);
    this.searchDate = this.attendanceReportForm.value.date;
    this.searchDate = this.datepipe.transform((this.searchDate), 'dd/MM/yyyy');
    console.log(this.searchDate);
    console.log(this.currentDate);
    loading.dismiss();
    this.fetchAttendance();
  }

  setupForm() {
    this.attendanceReportForm = new FormGroup({
        date: new FormControl('', [Validators.required]),
    });
}

  async fetchAttendance()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      //duration: 3000
      spinner: "dots"
    });
    await loading.present();
    const conditions = {};
     this.attendanceService.getAttendance(conditions).subscribe((response) =>{
     this.allAttendance = response;
     for(let i=0, j=0, k=0; i<this.allAttendance.length; i++){
      if(this.allAttendance[i]['EmployeeId'] == this.userId && this.allAttendance[i]['date'] == this.searchDate){
        this.myAttendance[j] = this.allAttendance[i];
        console.log("in For");
        console.log(this.myAttendance[j]);
        if(this.searchDate > this.currentDate){
          //this.myDateAttendance[k] == this.myAttendance[j];
          loading.dismiss();
          this.presentToast("Selected Date is invalid!");
          console.log("1st if");
        }else if(this.myAttendance[j]['day'] == 6 || this.myAttendance[j]['day'] == 7){
          loading.dismiss();
          this.presentToast("Selected date is weekend!");
          console.log("2nd if");
        }else{
          this.myDateAttendance[k] = this.myAttendance[j];
          loading.dismiss();
          console.log(this.myDateAttendance[k]);
          console.log("else");
        }
        
        
        j++;
      }
     }
    })

  }
}