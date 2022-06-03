import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { leaveService } from 'src/app/core/services/leave.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../core/services/common/auth.service';
import { attendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {

  //user = AuthService.getLoggedUser();
  userID = AuthService.getLoggedUser().id;
  officeID = AuthService.getLoggedUser().OfficeId;
  hour;
  minute;
  second;
  date;
  month;
  year;
  myDate = new Date();
  currentDateTime: any;
  attendance  = [] ;
  officeLeaves = [];
  markedFail = 0 ; 

  @ViewChild('leaveApplicationFormRef', { static: false }) leaveApplicationFormRef: NgForm;
  public leaveApplicationForm: FormGroup;

  constructor(private leaveService: leaveService, public toastController: ToastController,
    private route: Router,  private attendanceService: attendanceService,) { }

  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.setupForm();
    console.log(this.userID);
  }

  testerSubmitForm() {
    //console.log(this.criteriaForm.value);
    console.log(this.leaveApplicationForm.value.startDate);
    //console.log(this.sampleForm.value);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  public fetchCurentDate (){
    this.currentDateTime=this.datepipe.transform((new Date), 'dd/M/yyyy');
   console.log(this.currentDateTime);
    }
    
  createLeaves() {
    //this.isSubmitted = true;
    console.log(this.leaveApplicationForm.value);
    this.date = this.myDate.getDate();
    this.month = this.myDate.getMonth() + 1;
    this.year = this.myDate.getFullYear();
     if (this.leaveApplicationForm.invalid) {
       this.leaveApplicationForm.markAllAsTouched();
       this.presentToast("All the fields are required!");
       console.log("in if statement");
       return;
     }

    const value = JSON.parse(JSON.stringify(this.leaveApplicationForm.value));
    value[`EmployeeId`] = AuthService.getLoggedUser().id;
    value[`OfficeId`] = this.officeID;
    value['date'] = this.date + "/" + this.month + "/" + this.year;
    
    delete value._id;
    console.log("out of if statement...");

     if (this.leaveApplicationForm.value._id) {
       this.leaveService.updateLeaves(this.leaveApplicationForm.value._id, value).subscribe((response) => {
         console.log("leave updated successfully");
         this.leaveApplicationForm.reset();
       }, (error) => {
       })
     }
     else
     console.log("Else!");
      this.leaveService.createLeaves(value).subscribe((response) => {
        console.log(response);
        console.log("Applied!");
        this.presentToast("Leave Applied Successfully!");
        this.leaveApplicationForm.reset();
        this.route.navigate(['/dashboard']);
      }) 
    }

  setupForm() {

    this.leaveApplicationForm = new FormGroup({
      
        type: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        reason: new FormControl('', [Validators.required]),
    });
  }
}
