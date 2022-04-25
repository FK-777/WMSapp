import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
})
export class AttendanceReportComponent implements OnInit, AfterViewInit {
  
  @ViewChild('attendanceReportFormRef', { static: false }) attendanceReportFormRef: NgForm;
  public attendanceReportForm: FormGroup;


  constructor() { }
  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.setupForm();
  }

  testerSubmitForm() {
    //console.log(this.criteriaForm.value);
    console.log(this.attendanceReportForm.value);
    //console.log(this.sampleForm.value);
  }




  setupForm() {

    this.attendanceReportForm = new FormGroup({
        date: new FormControl('', [Validators.required]),
    });

}
}