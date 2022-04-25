import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { leaveService } from 'src/app/core/services/leave.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../core/services/common/auth.service';


@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {

  //user = AuthService.getLoggedUser();
  userID = AuthService.getLoggedUser().id;
  @ViewChild('leaveApplicationFormRef', { static: false }) leaveApplicationFormRef: NgForm;
  public leaveApplicationForm: FormGroup;


  constructor(private leaveService: leaveService, public toastController: ToastController,
    private route: Router) { }

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


  createLeaves() {
    //this.isSubmitted = true;
    console.log(this.leaveApplicationForm.value);
     if (this.leaveApplicationForm.invalid) {
       this.leaveApplicationForm.markAllAsTouched();
       this.presentToast("All the fields are required!");
       console.log("in if statement");
       return;
     }
    const value = JSON.parse(JSON.stringify(this.leaveApplicationForm.value));
    value[`EmployeeId`] = AuthService.getLoggedUser().id;
    delete value._id;
    console.log("out of if statement...");

     if (this.leaveApplicationForm.value._id) {
       this.leaveService.updateLeaves(this.leaveApplicationForm.value._id, value).subscribe((response) => {
         console.log("Sample updated successfully");
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
